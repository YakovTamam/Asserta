"use client";
import { useState, useEffect } from "react";
async function customerApi(body) {
  const res = await fetch("/api/auth/customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default function AccountSheet({ open, onClose }) {
  const [mode, setMode]         = useState("login"); // "login" | "register"
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [user, setUser]         = useState(null);

  useEffect(() => {
    customerApi({ action: "me" }).then(data => setUser(data?.user ?? null));
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setError(""); setSuccess("");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const data = await customerApi({ action: "login", email, password });
    if (data.error) { setError(data.error); }
    else {
      setUser({ email: data.email });
      setSuccess("ברוכים הבאים!");
      setTimeout(onClose, 1200);
    }
    setLoading(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const data = await customerApi({ action: "register", email, password, full_name: fullName, phone });
    if (data.error) { setError(data.error); setLoading(false); return; }
    setUser({ email: data.email });
    setSuccess("נרשמתם בהצלחה! ברוכים הבאים 🎉");
    setLoading(false);
    setTimeout(onClose, 1500);
  }

  async function handleLogout() {
    await customerApi({ action: "logout" });
    setUser(null);
    setSuccess("יצאתם בהצלחה");
    setTimeout(onClose, 1000);
  }

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, zIndex:8000,
          background:"rgba(0,0,0,0.45)", backdropFilter:"blur(2px)",
        }}
      />

      {/* Sheet */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:8001,
        background:"#fff", borderRadius:"20px 20px 0 0",
        padding:"24px 20px 40px",
        boxShadow:"0 -4px 32px rgba(0,0,0,0.15)",
        animation:"slideUpSheet 0.28s ease",
        direction:"rtl", maxHeight:"92dvh", overflowY:"auto",
      }}>
        <style>{`@keyframes slideUpSheet { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        {/* Handle bar */}
        <div style={{ width:40, height:4, borderRadius:2, background:"#e2e8f0", margin:"0 auto 20px" }} />

        {user ? (
          /* ── Logged in ── */
          <div style={{ textAlign:"center", padding:"12px 0" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>👤</div>
            <p style={{ fontWeight:700, fontSize:17, color:"#0f172a", marginBottom:4 }}>שלום!</p>
            <p style={{ fontSize:13, color:"#64748b", marginBottom:24 }}>{user.email}</p>
            <button onClick={handleLogout}
              style={{ width:"100%", padding:"13px", background:"#f1f5f9", color:"#374151", border:"none", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer" }}>
              התנתקות
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display:"flex", gap:4, background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:24 }}>
              {["login","register"].map(m => (
                <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }}
                  style={{
                    flex:1, padding:"10px", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer",
                    background: mode === m ? "#fff" : "transparent",
                    color: mode === m ? "#0f172a" : "#94a3b8",
                    boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    transition:"all 0.15s",
                  }}>
                  {m === "login" ? "כניסה" : "הרשמה"}
                </button>
              ))}
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>אימייל</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="your@email.com" dir="ltr"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:6 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>סיסמה</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="••••••••" dir="ltr"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                {error   && <p style={{ color:"#dc2626", fontSize:13, margin:"10px 0" }}>{error}</p>}
                {success && <p style={{ color:"#16a34a", fontSize:13, margin:"10px 0" }}>{success}</p>}
                <button type="submit" disabled={loading}
                  style={{ width:"100%", padding:"13px", background:"#0f172a", color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginTop:16, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "מתחבר..." : "כניסה"}
                </button>
                <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:"#64748b" }}>
                  אין חשבון?{" "}
                  <button type="button" onClick={() => setMode("register")}
                    style={{ background:"none", border:"none", color:"#0f172a", fontWeight:700, cursor:"pointer", fontSize:13, textDecoration:"underline" }}>
                    לחצו כאן להרשמה
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>שם מלא</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder="ישראל ישראלי"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>אימייל</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="your@email.com" dir="ltr"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>טלפון (אופציונלי)</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="050-0000000" dir="ltr"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                <div style={{ marginBottom:6 }}>
                  <label style={{ fontSize:12, color:"#64748b", display:"block", marginBottom:6 }}>סיסמה</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="לפחות 6 תווים" dir="ltr"
                    style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:15, boxSizing:"border-box" }} />
                </div>
                {error   && <p style={{ color:"#dc2626", fontSize:13, margin:"10px 0" }}>{error}</p>}
                {success && <p style={{ color:"#16a34a", fontSize:13, margin:"10px 0" }}>{success}</p>}
                <button type="submit" disabled={loading}
                  style={{ width:"100%", padding:"13px", background:"#0f172a", color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", marginTop:16, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "נרשם..." : "הרשמה"}
                </button>
                <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:"#64748b" }}>
                  יש לכם חשבון?{" "}
                  <button type="button" onClick={() => setMode("login")}
                    style={{ background:"none", border:"none", color:"#0f172a", fontWeight:700, cursor:"pointer", fontSize:13, textDecoration:"underline" }}>
                    כניסה
                  </button>
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}
