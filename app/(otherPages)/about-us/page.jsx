import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

export const metadata = {
  title: "אודות — Asserta",
  description: "הסיפור שלנו — Asserta תכשיטי יוקרה ישראליים, עיצוב ייחודי ואיכות ללא פשרות.",
};

const valueCards = [
  {
    title: "איכות ללא פשרות",
    icon: "💎",
    text: "אנו עובדים אך ורק עם חומרי גלם מהמשובחים בעולם — זהב, פלטינה ויהלומים מוסמכי GIA. כל תכשיט עובר בקרת איכות קפדנית לפני שהוא מגיע לידייך.",
  },
  {
    title: "עיצוב ייחודי",
    icon: "✦",
    text: "כל פיסת תכשיט שלנו מספרת סיפור משלה. הצוות שלנו מתכנן כל קולקציה בקפידה, תוך שילוב מסורת וחדשנות ליצירת עיצובים שיעמדו במבחן הזמן.",
  },
  {
    title: "שירות אישי",
    icon: "👑",
    text: "אנחנו מאמינים שרכישת תכשיט היא חוויה, לא רק עסקה. הסטייליסטים האישיים שלנו זמינים לייעץ, להתאים ולהפוך את החלום שלך למציאות.",
  },
];

export default function AboutUsPage() {
  return (
    <div dir="rtl" style={{ backgroundColor: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}>
      <Header1 parentClass="tf-header" />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #111 0%, #1a1409 60%, #111 100%)",
          padding: "100px 24px 90px",
          textAlign: "center",
          borderBottom: "1px solid #2a2416",
        }}
      >
        <p
          style={{
            letterSpacing: "0.3em",
            fontSize: 12,
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Asserta — תכשיטי יוקרה
        </p>
        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 200,
            letterSpacing: "0.08em",
            color: "#f0e6cc",
            margin: "0 auto 28px",
            lineHeight: 1.15,
          }}
        >
          הסיפור שלנו
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "#a09070",
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          מאחורי כל תכשיט עומד חזון — ליצור יופי שנשמר לנצח, מלאכת יד שמדברת בשפה שמעבר למילים.
        </p>
      </section>

      {/* Who we are */}
      <section style={{ padding: "80px 24px", maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "block", width: 36, height: 1, background: "#c9a84c" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>
            על המותג
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 300,
            color: "#f0e6cc",
            marginBottom: 36,
            letterSpacing: "0.04em",
          }}
        >
          מי אנחנו
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: "#b0a090", fontWeight: 300 }}>
            Asserta היא מותג תכשיטי יוקרה ישראלי שנוסד מתוך אהבה עזה לעיצוב, למלאכת יד ולאמנות הצורפות. המותג נולד מתוך חזון ברור — להנגיש יופי אמיתי ובלתי מתפשר לנשים ישראליות המבקשות תכשיטים שמספרים סיפור.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: "#b0a090", fontWeight: 300 }}>
            כל קולקציה מעוצבת בישראל ומיוצרת בעבודת יד בסטודיו שלנו. אנו משתמשים בזהב 14 ו-18 קראט, פלטינה טהורה ויהלומים שעוברים תהליך ברירה קפדני על ידי מומחי GIA. האמנים שלנו מביאים עמם עשרות שנות ניסיון בצורפות ישראלית ובינלאומית.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: "#b0a090", fontWeight: 300 }}>
            מאז ייסודנו, אנו גאים לשרת אלפי לקוחות מרוצות שמצאו אצלנו את התכשיט שתמיד חלמו עליו — בין אם זו טבעת אירוסין, שרשרת יום הולדת מיוחדת או עגיל שהפך לחתימה אישית.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 820, margin: "0 auto 0", padding: "0 24px" }}>
        <hr style={{ border: "none", borderTop: "1px solid #2a2416" }} />
      </div>

      {/* Values */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ display: "block", width: 36, height: 1, background: "#c9a84c" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>
              מה מנחה אותנו
            </span>
            <span style={{ display: "block", width: 36, height: 1, background: "#c9a84c" }} />
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 300,
              color: "#f0e6cc",
              letterSpacing: "0.04em",
            }}
          >
            הערכים שלנו
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {valueCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "linear-gradient(145deg, #1a1614 0%, #141210 100%)",
                border: "1px solid #2a2416",
                borderRadius: 4,
                padding: "44px 32px",
                textAlign: "center",
                transition: "border-color 0.3s",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 20,
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 500,
                  color: "#f0e6cc",
                  marginBottom: 16,
                  letterSpacing: "0.03em",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: "#8a7a60", fontWeight: 300 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1409 0%, #0d0d0d 100%)",
          borderTop: "1px solid #2a2416",
          borderBottom: "1px solid #2a2416",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          מוזמנים להכיר
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 300,
            color: "#f0e6cc",
            marginBottom: 18,
            letterSpacing: "0.04em",
          }}
        >
          מוכנים למצוא את התכשיט המושלם?
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#8a7a60",
            marginBottom: 36,
            maxWidth: 460,
            margin: "0 auto 36px",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          צוות הסטייליסטים שלנו ישמח לעזור לך למצוא את התכשיט שמדבר אליך. צרי איתנו קשר עוד היום.
        </p>
        <Link
          href="/contact-us"
          style={{
            display: "inline-block",
            padding: "14px 44px",
            background: "transparent",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          צרי קשר
        </Link>
      </section>

      <Footer1 />
    </div>
  );
}
