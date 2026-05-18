import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות | Asserta",
  description: "מדיניות הפרטיות של Asserta - כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#111" }}>{title}</h2>
    <div style={{ fontSize: 15, lineHeight: 1.9, color: "#444" }}>{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface">
      <div id="wrapper">
        <Topbar3 />
        <Header1 parentClass="tf-header" />

        <section style={{ padding: "60px 0 80px" }}>
          <div className="container" style={{ maxWidth: 820 }}>
            {/* Breadcrumb */}
            <ul style={{ display: "flex", gap: 8, alignItems: "center", listStyle: "none", padding: 0, marginBottom: 40, fontSize: 13, color: "#888" }}>
              <li><Link href="/" style={{ color: "#888" }}>בית</Link></li>
              <li>›</li>
              <li style={{ color: "#111" }}>מדיניות פרטיות</li>
            </ul>

            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: "#111" }}>מדיניות פרטיות</h1>
            <p style={{ fontSize: 13, color: "#999", marginBottom: 48 }}>עדכון אחרון: מאי 2025</p>

            <Section title="1. כללי">
              <p>
                Asserta ("החברה", "אנחנו") מכבדת את פרטיות המשתמשים באתר{" "}
                <strong>asserta.co.il</strong> ("האתר"). מדיניות פרטיות זו מסבירה אילו פרטים אנו אוספים,
                כיצד אנו משתמשים בהם, ומהן הזכויות שלך בנוגע למידע זה.
              </p>
              <p style={{ marginTop: 10 }}>
                השימוש באתר מהווה הסכמה לתנאי מדיניות פרטיות זו. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש באתר.
              </p>
            </Section>

            <Section title="2. מידע שאנו אוספים">
              <p><strong>מידע שאתה מספק לנו ישירות:</strong></p>
              <ul style={{ paddingRight: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>שם מלא, כתובת דוא"ל, מספר טלפון — בעת יצירת חשבון או ביצוע הזמנה</li>
                <li>כתובת למשלוח</li>
                <li>פרטי תשלום — מועברים ישירות לספק התשלום (HYP) ואינם נשמרים אצלנו</li>
                <li>הערות להזמנה וכל מידע שתבחר לשתף עמנו</li>
              </ul>
              <p style={{ marginTop: 12 }}><strong>מידע שנאסף אוטומטית:</strong></p>
              <ul style={{ paddingRight: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>כתובת IP, סוג דפדפן, מערכת הפעלה</li>
                <li>עמודים שביקרת בהם, זמן שהייה, מקור ההגעה לאתר</li>
                <li>קובצי Cookie — ראה סעיף 5</li>
              </ul>
            </Section>

            <Section title="3. כיצד אנו משתמשים במידע">
              <ul style={{ paddingRight: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                <li>עיבוד הזמנות ומשלוח מוצרים</li>
                <li>יצירת קשר בנוגע להזמנות, מוצרים ושירות לקוחות</li>
                <li>שליחת עדכונים ומבצעים — בהסכמתך בלבד, עם אפשרות הסרה בכל עת</li>
                <li>שיפור חווית הגלישה באתר ואנליזת תעבורה</li>
                <li>עמידה בדרישות חוקיות</li>
              </ul>
            </Section>

            <Section title="4. שיתוף מידע עם צדדים שלישיים">
              <p>אנו לא מוכרים ולא מעבירים את פרטיך לצדדים שלישיים למטרות שיווק. המידע עשוי להיות משותף עם:</p>
              <ul style={{ paddingRight: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong>ספק תשלום (HYP)</strong> — לצורך עיבוד תשלומים בלבד</li>
                <li><strong>שירותי משלוח</strong> — לצורך אספקת ההזמנה</li>
                <li><strong>Supabase</strong> — אחסון נתוני האתר בשרתים מאובטחים</li>
                <li><strong>Cloudinary</strong> — אחסון תמונות מוצרים</li>
                <li><strong>רשויות חוק</strong> — כאשר נדרש על פי חוק</li>
              </ul>
            </Section>

            <Section title="5. קובצי Cookie">
              <p>אנו משתמשים בקובצי Cookie לצורך:</p>
              <ul style={{ paddingRight: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong>Cookie חיוני</strong> — שמירת שפת האתר (עברית/אנגלית) ועגלת הקניות</li>
                <li><strong>Cookie ניתוח</strong> — הבנת אופן השימוש באתר (ניתן לסירוב)</li>
              </ul>
              <p style={{ marginTop: 10 }}>
                תוכל לנהל את הגדרות ה-Cookie דרך הגדרות הדפדפן שלך, או דרך באנר ה-Cookie המופיע בביקורך הראשון באתר.
              </p>
            </Section>

            <Section title="6. אבטחת מידע">
              <p>
                אנו נוקטים באמצעי אבטחה מקובלים בתעשייה להגנה על המידע שלך, כולל הצפנת SSL,
                גישה מוגבלת לנתונים ואחסון בשרתים מאובטחים. עם זאת, אין אנו יכולים להבטיח
                אבטחה מוחלטת של כל מידע המועבר דרך האינטרנט.
              </p>
            </Section>

            <Section title="7. שמירת מידע">
              <p>
                אנו שומרים את פרטיך כל עוד חשבונך פעיל, או כנדרש לצורך מתן השירות.
                פרטי הזמנות נשמרים למשך 7 שנים בהתאם לדרישות חוק החשבונאות הישראלי.
                תוכל לבקש מחיקת חשבונך בכל עת — ראה סעיף 8.
              </p>
            </Section>

            <Section title="8. הזכויות שלך">
              <p>בהתאם לחוק הגנת הפרטיות הישראלי, יש לך זכות:</p>
              <ul style={{ paddingRight: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong>עיון</strong> — לקבל עותק של המידע שאנו מחזיקים עליך</li>
                <li><strong>תיקון</strong> — לתקן מידע שגוי</li>
                <li><strong>מחיקה</strong> — לבקש מחיקת המידע שלך</li>
                <li><strong>התנגדות</strong> — להתנגד לשימוש במידע שלך לצרכי שיווק</li>
                <li><strong>ניידות</strong> — לקבל את המידע שלך בפורמט קריא</li>
              </ul>
              <p style={{ marginTop: 10 }}>לממש את זכויותיך, פנה אלינו בכתובת המפורטת בסעיף 9.</p>
            </Section>

            <Section title="9. יצירת קשר">
              <p>לכל שאלה בנושא פרטיות, ניתן לפנות אלינו:</p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <p>📧 <strong>דוא"ל:</strong> asserta10@gmail.com</p>
                <p>🌐 <strong>אתר:</strong>{" "}
                  <Link href="/contact-us" style={{ color: "#111", textDecoration: "underline" }}>
                    טופס יצירת קשר
                  </Link>
                </p>
              </div>
            </Section>

            <Section title="10. שינויים במדיניות">
              <p>
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו באתר
                ויישלח עדכון למנויי הניוזלטר. המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים.
              </p>
            </Section>

          </div>
        </section>

        <Footer1 />
      </div>
    </div>
  );
}
