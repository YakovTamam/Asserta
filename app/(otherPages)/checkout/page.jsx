"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

const SUMMARY = [
  { ...DEMO_PRODUCTS[0], qty: 1 },
  { ...DEMO_PRODUCTS[2], qty: 1 },
];
const total = SUMMARY.reduce((s, i) => s + i.price * i.qty, 0);

const inp = {
  width: "100%", padding: "12px 16px", borderRadius: 10,
  border: "1px solid #e5e7eb", fontSize: 14, outline: "none",
  fontFamily: "inherit", background: "#fafafa", boxSizing: "border-box",
};

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push("/thank-you");
  }

  return (
    <>
      <Header1 />
      <main style={{ minHeight: "100vh", background: "#f9f9f9", direction: "rtl", padding: "40px 16px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 32, color: "#111" }}>תשלום</h1>

          <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, color: "#111" }}>פרטי משלוח</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>שם מלא *</label>
                <input required style={inp} value={form.name} onChange={e => set("name", e.target.value)} placeholder="ישראל ישראלי" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>טלפון *</label>
                <input required style={{ ...inp, direction: "ltr" }} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="050-0000000" />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>כתובת מייל *</label>
              <input required type="email" style={{ ...inp, direction: "ltr" }} value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>כתובת *</label>
                <input required style={inp} value={form.address} onChange={e => set("address", e.target.value)} placeholder="רחוב ומספר בית" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>עיר *</label>
                <input required style={inp} value={form.city} onChange={e => set("city", e.target.value)} placeholder="תל אביב" />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>הערות</label>
              <textarea style={{ ...inp, resize: "vertical", minHeight: 72 }} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="הוראות מיוחדות..." />
            </div>

            {/* Order summary */}
            <div style={{ background: "#f9f9f9", borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#111" }}>סיכום הזמנה</h3>
              {SUMMARY.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span>{item.emoji} {item.title}</span>
                  <span style={{ fontWeight: 600 }}>₪{Number(item.price).toLocaleString("he-IL")}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
                <span>סה"כ</span>
                <span>₪{Number(total).toLocaleString("he-IL")}</span>
              </div>
              <p style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>משלוח חינם לכל הארץ</p>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "16px", background: loading ? "#666" : "#111",
              color: "#fff", border: "none", borderRadius: 12, fontSize: 15,
              fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: "inherit",
            }}>
              {loading ? "מעבד..." : "אשר הזמנה"}
            </button>
          </form>
        </div>
      </main>
      <Footer1 />
    </>
  );
}
