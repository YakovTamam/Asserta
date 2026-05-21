import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/lib/models/Customer";
export const dynamic = "force-dynamic";

const scryptAsync = promisify(scrypt);
const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-dev-secret");

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)).toString("hex");
  return `${salt}:${hash}`;
}

async function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const derived = await scryptAsync(password, salt, 64);
  return timingSafeEqual(hashBuf, derived);
}

async function makeToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret());
}

function setSession(res, email, id) {
  res.cookies.set("customer_token", "", { maxAge: 0 });
  makeToken({ email, id }).then(token => {
    res.cookies.set("customer_token", token, {
      httpOnly: true, maxAge: 30 * 24 * 3600, path: "/", sameSite: "lax",
    });
  });
}

export async function POST(req) {
  const { action, email, password, full_name, phone } = await req.json();

  if (action === "me") {
    const cookieStore = await cookies();
    const token = cookieStore.get("customer_token")?.value;
    if (!token) return NextResponse.json({ user: null });
    try {
      const { payload } = await jwtVerify(token, secret());
      return NextResponse.json({ user: { email: payload.email, id: payload.id } });
    } catch {
      return NextResponse.json({ user: null });
    }
  }

  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("customer_token", "", { maxAge: 0, path: "/" });
    return res;
  }

  await connectDB();

  if (action === "register") {
    const exists = await Customer.findOne({ email: email.trim().toLowerCase() });
    if (exists) return NextResponse.json({ error: "אימייל כבר קיים במערכת" }, { status: 400 });
    const hashed = await hashPassword(password);
    const customer = await Customer.create({ email: email.trim().toLowerCase(), password: hashed, full_name, phone });
    const token = await makeToken({ id: customer._id.toString(), email: customer.email });
    const res = NextResponse.json({ ok: true, email: customer.email });
    res.cookies.set("customer_token", token, { httpOnly: true, maxAge: 30 * 24 * 3600, path: "/", sameSite: "lax" });
    return res;
  }

  if (action === "login") {
    const customer = await Customer.findOne({ email: email.trim().toLowerCase() });
    if (!customer) return NextResponse.json({ error: "אימייל או סיסמה שגויים" }, { status: 401 });
    const valid = await verifyPassword(password, customer.password);
    if (!valid) return NextResponse.json({ error: "אימייל או סיסמה שגויים" }, { status: 401 });
    const token = await makeToken({ id: customer._id.toString(), email: customer.email });
    const res = NextResponse.json({ ok: true, email: customer.email });
    res.cookies.set("customer_token", token, { httpOnly: true, maxAge: 30 * 24 * 3600, path: "/", sameSite: "lax" });
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
