import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות — Asserta",
  description: "מדיניות הפרטיות של Asserta — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

const sectionHeadingStyle = {
  fontSize: 19,
  fontWeight: 500,
  color: "#f0e6cc",
  marginBottom: 14,
  letterSpacing: "0.02em",
  paddingBottom: 10,
  borderBottom: "1px solid #1e1a12",
};

const bodyText = {
  fontSize: 14,
  lineHeight: 1.95,
  color: "#8a7a60",
  fontWeight: 300,
  margin: "0 0 10px",
};

const listStyle = {
  paddingRight: 20,
  margin: "10px 0",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const listItemStyle = {
  fontSize: 14,
  lineHeight: 1.8,
  color: "#8a7a60",
  fontWeight: 300,
};

function Section({ number, title, children }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <h2 style={sectionHeadingStyle}>
        <span style={{ color: "#c9a84c", marginLeft: 10, fontWeight: 300 }}>{number}.</span>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div dir="rtl" style={{ backgroundColor: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}>
      <Header1 parentClass="tf-header" />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #111 0%, #1a1409 60%, #111 100%)",
          padding: "72px 24px 60px",
          textAlign: "center",
          borderBottom: "1px solid #2a2416",
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
          Asserta
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 200,
            letterSpacing: "0.06em",
            color: "#f0e6cc",
            marginBottom: 18,
          }}
        >
          מדיניות פרטיות
        </h1>
        <p style={{ fontSize: 13, color: "#5a4a30", fontWeight: 300 }}>
          עדכון אחרון: ינואר 2025
        </p>
      </section>

      {/* Content */}
      <section style={{ padding: "72px 24px 90px" }}>
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            background: "linear-gradient(145deg, #1a1614 0%, #141210 100%)",
            border: "1px solid #2a2416",
            borderRadius: 4,
            padding: "clamp(28px, 5vw, 56px)",
          }}
        >

          {/* Intro */}
          <p style={{ ...bodyText, marginBottom: 40, fontSize: 15, color: "#a09070", lineHeight: 1.9 }}>
            Asserta (&quot;החברה&quot;, &quot;אנחנו&quot;) מכבדת את פרטיות המשתמשים באתר{" "}
            <strong style={{ color: "#c9a84c", fontWeight: 400 }}>asserta.co.il</strong>{" "}
            (&quot;האתר&quot;). מדיניות זו מסבירה אילו פרטים אנו אוספים, כיצד אנו משתמשים בהם ומהן זכויותיך.
            השימוש באתר מהווה הסכמה לתנאי מדיניות זו.
          </p>

          <Section number="1" title="מידע שאנו אוספים">
            <p style={bodyText}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>מידע שאתה מספק ישירות:</strong></p>
            <ul style={listStyle}>
              <li style={listItemStyle}>שם מלא, כתובת דוא&quot;ל, מספר טלפון — בעת יצירת חשבון או ביצוע הזמנה</li>
              <li style={listItemStyle}>כתובת למשלוח</li>
              <li style={listItemStyle}>פרטי תשלום — מועברים ישירות לספק התשלום ואינם נשמרים אצלנו</li>
              <li style={listItemStyle}>הערות להזמנה וכל מידע נוסף שתבחר לשתף</li>
            </ul>
            <p style={{ ...bodyText, marginTop: 14 }}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>מידע הנאסף אוטומטית:</strong></p>
            <ul style={listStyle}>
              <li style={listItemStyle}>כתובת IP, סוג דפדפן, מערכת הפעלה</li>
              <li style={listItemStyle}>עמודים שביקרת, זמן שהייה, מקור ההגעה לאתר</li>
              <li style={listItemStyle}>קובצי Cookie ומזהי מכשיר — ראה סעיף 5</li>
            </ul>
          </Section>

          <Section number="2" title="שימוש במידע">
            <p style={bodyText}>אנו משתמשים במידע שנאסף לצרכים הבאים:</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>עיבוד הזמנות, תשלומים ומשלוח מוצרים</li>
              <li style={listItemStyle}>תקשורת בנוגע להזמנות, שאלות ושירות לקוחות</li>
              <li style={listItemStyle}>שליחת עדכונים, מבצעים וניוזלטר — בהסכמתך בלבד, עם אפשרות הסרה בכל עת</li>
              <li style={listItemStyle}>שיפור חווית הגלישה ואנליזת תעבורה לצורך פיתוח האתר</li>
              <li style={listItemStyle}>עמידה בדרישות חוקיות ורגולטוריות</li>
              <li style={listItemStyle}>מניעת הונאות ושמירה על אבטחת האתר</li>
            </ul>
          </Section>

          <Section number="3" title="שיתוף מידע עם צדדים שלישיים">
            <p style={bodyText}>
              אנו אינם מוכרים ואינם משתפים את פרטיך עם צדדים שלישיים למטרות שיווק. המידע עשוי להיות משותף עם:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>ספק תשלום</strong> — לצורך עיבוד תשלומים מאובטח בלבד</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>שירותי משלוח</strong> — לצורך אספקת ההזמנה לכתובתך</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>Supabase</strong> — אחסון נתוני האתר בשרתים מאובטחים</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>Cloudinary</strong> — אחסון תמונות מוצרים</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>רשויות חוק</strong> — כאשר נדרש מכוח חוק, צו שיפוטי או רגולציה</li>
            </ul>
            <p style={{ ...bodyText, marginTop: 14 }}>
              כל שותפים צד שלישי כפופים לחוזי עיבוד נתונים המחייבים אותם להגן על המידע שלך.
            </p>
          </Section>

          <Section number="4" title="אבטחת מידע">
            <p style={bodyText}>
              אנו נוקטים באמצעי אבטחה מקובלים בתעשייה להגנה על המידע שלך:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>הצפנת SSL/TLS לכל העברות הנתונים</li>
              <li style={listItemStyle}>גישה מוגבלת לנתונים לעובדים מורשים בלבד</li>
              <li style={listItemStyle}>אחסון בשרתים מאובטחים עם בקרת גישה</li>
              <li style={listItemStyle}>ניטור שוטף וסריקת פגיעויות אבטחה</li>
            </ul>
            <p style={{ ...bodyText, marginTop: 14 }}>
              עם זאת, אין ביכולתנו להבטיח אבטחה מוחלטת של כל מידע המועבר דרך האינטרנט. אנא אל תשתף
              סיסמאות או פרטים רגישים בערוצים לא מאובטחים.
            </p>
          </Section>

          <Section number="5" title="קובצי Cookie">
            <p style={bodyText}>האתר משתמש בסוגי Cookie הבאים:</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <strong style={{ color: "#d4c4a0", fontWeight: 500 }}>Cookie חיוני</strong> — שמירת שפת האתר, עגלת הקניות ופרטי התחברות. ללא אלה האתר לא יתפקד כהלכה.
              </li>
              <li style={listItemStyle}>
                <strong style={{ color: "#d4c4a0", fontWeight: 500 }}>Cookie ניתוח</strong> — הבנת אופן השימוש באתר לצורך שיפורו. ניתן לסירוב.
              </li>
              <li style={listItemStyle}>
                <strong style={{ color: "#d4c4a0", fontWeight: 500 }}>Cookie שיווקי</strong> — התאמת פרסום אישית. בשימוש בהסכמה בלבד.
              </li>
            </ul>
            <p style={{ ...bodyText, marginTop: 14 }}>
              תוכל לנהל את הגדרות ה-Cookie דרך הגדרות הדפדפן שלך. שים לב שחסימת Cookie חיוני עלולה לפגוע בפונקציונליות האתר.
            </p>
          </Section>

          <Section number="6" title="זכויות המשתמש">
            <p style={bodyText}>בהתאם לחוק הגנת הפרטיות הישראלי ו-GDPR, יש לך זכות:</p>
            <ul style={listStyle}>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>עיון</strong> — לקבל עותק של המידע שאנו מחזיקים עליך</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>תיקון</strong> — לתקן מידע שגוי או לא מדויק</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>מחיקה</strong> — לבקש מחיקת המידע שלך, בכפוף לחובות שמירה חוקיות</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>התנגדות</strong> — להתנגד לעיבוד המידע שלך לצרכי שיווק</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>ניידות</strong> — לקבל את המידע שלך בפורמט קריא-מכונה</li>
              <li style={listItemStyle}><strong style={{ color: "#d4c4a0", fontWeight: 500 }}>הגבלה</strong> — להגביל את עיבוד המידע שלך בנסיבות מסוימות</li>
            </ul>
            <p style={{ ...bodyText, marginTop: 14 }}>
              לממש את זכויותיך, פנה אלינו בכתובת המפורטת בסעיף 7. נשיב לבקשתך תוך 30 ימים.
            </p>
          </Section>

          <Section number="7" title="יצירת קשר">
            <p style={bodyText}>לכל שאלה או בקשה בנושא פרטיות, ניתן לפנות אלינו:</p>
            <div
              style={{
                marginTop: 16,
                background: "#0d0d0d",
                border: "1px solid #2a2416",
                borderRadius: 3,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p style={{ ...bodyText, margin: 0 }}>
                <span style={{ color: "#c9a84c" }}>דוא&quot;ל: </span>
                <a href="mailto:info@asserta.co.il" style={{ color: "#d4c4a0", textDecoration: "none" }}>
                  info@asserta.co.il
                </a>
              </p>
              <p style={{ ...bodyText, margin: 0 }}>
                <span style={{ color: "#c9a84c" }}>טופס יצירת קשר: </span>
                <Link href="/contact-us" style={{ color: "#d4c4a0", textDecoration: "underline" }}>
                  asserta.co.il/contact-us
                </Link>
              </p>
            </div>
            <p style={{ ...bodyText, marginTop: 16 }}>
              שינויים מהותיים במדיניות זו יפורסמו באתר ויישלח עדכון למנויי הניוזלטר. המשך השימוש באתר
              לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
            </p>
          </Section>

        </div>
      </section>

      <Footer1 />
    </div>
  );
}
