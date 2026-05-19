"use client";
import { useState } from "react";

const SECTIONS = [
  {
    id: "start",
    icon: "🚀",
    title: "תחילת העבודה",
    color: "#6366f1",
    items: [
      {
        q: "מה צריך להגדיר ב-Supabase?",
        a: `יש להריץ את ה-SQL הבא ב-Supabase → SQL Editor:

CREATE TABLE categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_he    text NOT NULL,
  name_en    text,
  slug       text NOT NULL UNIQUE,
  image_url  text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_he        text,
  title_en        text,
  slug            text,
  description_he  text,
  price           numeric NOT NULL,
  old_price       numeric,
  badge           text,
  in_stock        boolean DEFAULT true,
  featured        boolean DEFAULT false,
  images          text[] DEFAULT '{}',
  category_id     uuid REFERENCES categories(id),
  category_ids    uuid[] DEFAULT '{}',
  specs           jsonb DEFAULT '[]',
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE customers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  text,
  email      text,
  phone      text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  uuid REFERENCES customers(id),
  status       text DEFAULT 'pending',
  total_amount numeric,
  items        jsonb DEFAULT '[]',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE products   DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders     DISABLE ROW LEVEL SECURITY;
ALTER TABLE customers  DISABLE ROW LEVEL SECURITY;`,
      },
      {
        q: "אילו משתני סביבה דרושים?",
        a: `יש להגדיר ב-Vercel → Settings → Environment Variables:

NEXT_PUBLIC_SUPABASE_URL
  ← Supabase → Project Settings → API → Project URL

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ← Supabase → Project Settings → API → anon key

SUPABASE_SECRET_KEY
  ← Supabase → Project Settings → API → service_role key

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
  ← Cloudinary → Dashboard`,
      },
      {
        q: "איך יוצרים משתמש אדמין?",
        a: `Supabase → Authentication → Users → Add user
הכנס אימייל וסיסמה.
אלו יהיו פרטי ההתחברות לכתובת /admin/login`,
      },
    ],
  },
  {
    id: "products",
    icon: "💍",
    title: "ניהול מוצרים",
    color: "#0f172a",
    items: [
      {
        q: "איך מוסיפים מוצר חדש?",
        a: `שלב 1 — תמונות
• לחצי על אזור ההעלאה (ריבוע מקוקו) ← בחרי תמונה מהגלריה
• ניתן להעלות מספר תמונות
• התמונה הראשונה תופיע בכרטיסיית המוצר

שלב 2 — פרטים
• שם המוצר בעברית (חובה)
• מחיר (חובה)
• מחיר לפני הנחה — יוצג עם קו חוצה
• Badge — תווית כמו SALE / NEW / HOT
• במלאי / מומלץ — הפעלה/כיבוי

שלב 3 — קטגוריות ומפרטים
• בחרי קטגוריה (חובה לפחות אחת)
• הוסיפי מפרטים טכניים (קראט, סוג אבן...)
• תיאור המוצר (אופציונלי)`,
      },
      {
        q: "איך עורכים מוצר קיים?",
        a: `ב-/admin/products לחצי על כרטיסיית המוצר שרוצים לערוך.
הטופס ייפתח עם כל הנתונים הקיימים.
ניתן לעדכן כל שדה ולשמור.`,
      },
      {
        q: "מה זה Badge?",
        a: `Badge הוא תווית קטנה שמופיעה על תמונת המוצר.
דוגמאות: SALE · NEW · HOT · LIMITED
ניתן לכתוב כל טקסט קצר.`,
      },
      {
        q: "מה ההבדל בין מחיר למחיר לפני הנחה?",
        a: `מחיר — המחיר הנוכחי שמוצג ללקוח.
מחיר לפני הנחה — יוצג עם קו חוצה לידו, מראה שהיה יקר יותר.
אם שניהם מוזנים — תופיע גם תווית "Special Price".`,
      },
    ],
  },
  {
    id: "specs",
    icon: "📐",
    title: "מפרטים טכניים",
    color: "#0891b2",
    items: [
      {
        q: "מה זה מפרטים ואיך הם נראים?",
        a: `מפרטים הם שורת נתונים שמופיעה מתחת לתמונת המוצר בדף הבית.
כל מפרט מורכב מ-3 חלקים:
  • אייקון — תמונה קטנה (אמוג'י כתמונה / SVG / PNG)
  • ערך — למשל: 11.7ct / VVS1 / Moissanite
  • תווית — למשל: קראט / צבע / סוג האבן`,
      },
      {
        q: "איך מוסיפים מפרט?",
        a: `בשלב 3 של הוספת מוצר לחצי על "+ הוסף".
לכל מפרט:
  1. לחצי על הריבוע המקוקו להעלאת אייקון
  2. הזיני ערך (11.7ct)
  3. הזיני תווית (קראט)
ניתן למחוק מפרט בלחיצה על ×`,
      },
      {
        q: "מה כדאי לכלול כמפרטים לתכשיטים?",
        a: `המלצות:
  💎 סוג האבן — Moissanite / Diamond / Zirconia
  ✨ איכות — VVS1 / VS2 / SI1
  ⚖️ קראט — 1.5ct / 3ct / 11.7ct
  🎨 צבע — D / E / F / G
  🏅 מתכת — זהב 14K / זהב 18K / פלטינה / כסף 925
  📏 גודל — 16mm / 50cm`,
      },
    ],
  },
  {
    id: "categories",
    icon: "🏷️",
    title: "קטגוריות",
    color: "#059669",
    items: [
      {
        q: "איך מוסיפים קטגוריה?",
        a: `נכנסים ל-/admin/categories ← לוחצים "+ קטגוריה"
  • שם בעברית (חובה) — למשל: טבעות
  • שם באנגלית — למשל: Rings
  • Slug — נוצר אוטומטית (rings), ניתן לשנות
  • תמונה — אופציונלי, מועלת מהגלריה`,
      },
      {
        q: "מה זה Slug?",
        a: `Slug הוא המזהה של הקטגוריה ב-URL.
למשל הקטגוריה "טבעות" תקבל slug: rings
וניתן יהיה לסנן לפיו: /shop?category=rings
נוצר אוטומטית מהשם, אפשר גם לשנות ידנית.`,
      },
      {
        q: "מה הסדר הנכון — קודם קטגוריות או מוצרים?",
        a: `חובה קודם קטגוריות, אחר כך מוצרים.
שמירת מוצר ללא קטגוריה חסומה במערכת.
סדר עבודה:
  1. צרי קטגוריות (/admin/categories)
  2. הוסיפי מוצרים ושייכי לקטגוריות (/admin/products)`,
      },
    ],
  },
  {
    id: "orders",
    icon: "📦",
    title: "הזמנות",
    color: "#d97706",
    items: [
      {
        q: "מה הסטטוסים האפשריים?",
        a: `ממתין — הזמנה התקבלה, טרם טופלה
שולם   — התשלום אושר
נשלח   — הפריט יצא למשלוח
נמסר   — הלקוח קיבל את המוצר
בוטל   — ההזמנה בוטלה`,
      },
      {
        q: "איך מעדכנים סטטוס הזמנה?",
        a: `ב-/admin/orders לחצו על כרטיסיית ההזמנה.
ייפתח פאנל פרטים עם כפתורי סטטוס.
לחצו על הסטטוס הרצוי — השינוי נשמר מיידית.`,
      },
      {
        q: "איך מסננים הזמנות לפי סטטוס?",
        a: `בראש הדף יש שורת פילטרים: הכל / ממתין / שולם / נשלח / נמסר / בוטל.
לחיצה על פילטר מציגה רק את ההזמנות הרלוונטיות.
ניתן גם להגיע ישירות מהתפריט הצדדי.`,
      },
    ],
  },
];

function AccordionItem({ q, a, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f1f5f9" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", textAlign: "right", padding: "14px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 20, color: "#94a3b8", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none" }}>›</span>
      </button>
      {open && (
        <pre style={{ margin: "0 0 16px", padding: "14px 16px", background: "#f8fafc", borderRadius: 10, fontSize: 13, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-wrap", wordBreak: "break-word", borderRight: `3px solid ${color}`, fontFamily: "inherit" }}>
          {a}
        </pre>
      )}
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState("start");
  const section = SECTIONS.find((s) => s.id === active);

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>מדריך למשתמש</h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>כל מה שצריך לדעת לניהול החנות</p>
      </div>

      {/* Section tabs — horizontal scroll on mobile */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 22, border: "1.5px solid", borderColor: active === s.id ? s.color : "#e2e8f0", background: active === s.id ? s.color : "#fff", color: active === s.id ? "#fff" : "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.15s" }}
          >
            <span>{s.icon}</span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Section content */}
      {section && (
        <div style={{ background: "#fff", borderRadius: 16, padding: "8px 20px 4px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0 12px", borderBottom: "2px solid #f1f5f9", marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>{section.icon}</span>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: 0 }}>{section.title}</h2>
          </div>
          {section.items.map((item, i) => (
            <AccordionItem key={i} q={item.q} a={item.a} color={section.color} />
          ))}
        </div>
      )}
    </div>
  );
}
