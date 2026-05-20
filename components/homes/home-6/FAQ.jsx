"use client";
import { useState, useEffect } from "react";

const FALLBACK_ITEMS = [
  {
    q: "אילו אמצעי תשלום אתם מקבלים?",
    a: "אנו מקבלים את כל אמצעי התשלום הנפוצים: כרטיסי אשראי (ויזה, מאסטרקארד, אמריקן אקספרס), Bit, Apple Pay ו-Google Pay. כל העסקאות מאובטחות בתקן הגבוה ביותר.",
  },
  {
    q: "האם ניתן לשלם בתשלומים?",
    a: "בהחלט. אנו מציעים פריסה של עד 12 תשלומים ללא ריבית על הזמנות מעל ₪1,000. ניתן לבחור את מספר התשלומים בשלב התשלום.",
  },
  {
    q: "מהו זמן האספקה?",
    a: "משלוח רגיל מגיע תוך 3–5 ימי עסקים לכל רחבי הארץ. הזמנות שהתקבלו לפני 12:00 יוצאות ביום אותו יום.",
  },
  {
    q: "האם יש אפשרות למשלוח אקספרס?",
    a: "כן! משלוח אקספרס בתוך 24 שעות זמין על רוב הפריטים שבמלאי, בתוספת תשלום סמלי. ניתן לבחור באפשרות זו בשלב התשלום.",
  },
  {
    q: "מה כוללת האחריות על התכשיטים?",
    a: "כל תכשיט מגיע עם אחריות מלאה לשנתיים הכוללת: תיקון פגמי ייצור, ניקוי מקצועי חינם פעם בשנה ותעודת אותנטיות. טבעות יהלום כוללות תעודת GIA.",
  },
  {
    q: "האם ניתן להזמין תכשיט מותאם אישית?",
    a: "כן, אנו מציעים שירות עיצוב Bespoke — תכשיט שנוצר במיוחד עבורך, מהסקיצה הראשונה ועד המוצר המוגמר. צרי קשר עם הצוות שלנו ונשמח להוציא לפועל את החזון שלך.",
  },
  {
    q: "מאיזה חומרים עשויים התכשיטים?",
    a: "אנו עובדים אך ורק עם חומרים מהשורה הראשונה: זהב 14K ו-18K, כסף 925, יהלומים טבעיים מוסמכים ואבני חן איכותיות. כל פריט מסומן עם חריטת הכיתה.",
  },
  {
    q: "מה מדיניות ההחזרות?",
    a: "ניתן להחזיר כל פריט תוך 14 יום מיום קבלתו, בתנאי שהוא במצבו המקורי ועם האריזה. החזר כספי מלא או החלפה — לפי בחירתך. תכשיטים מותאמים אישית אינם ניתנים להחזרה.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [items, setItems] = useState(FALLBACK_ITEMS);

  useEffect(() => {
    fetch("/api/content/faq")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map(item => ({ q: item.question, a: item.answer })));
        }
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section style={{ background: "#0d0d0d", padding: "80px 20px", direction: "rtl" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 14 }}>
            יש לך שאלות?
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>
            כל מה שרצית לדעת
          </h2>
        </div>

        {/* Items */}
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between", padding: "22px 28px",
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: "right", gap: 16,
                  }}
                >
                  <span style={{
                    fontSize: 16, fontWeight: 600, color: isOpen ? "#fff" : "rgba(255,255,255,0.85)",
                    lineHeight: 1.4, flex: 1,
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.7)", fontSize: 18, fontWeight: 300,
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform 0.25s ease",
                  }}>
                    +
                  </span>
                </button>

                {/* Answer */}
                <div style={{
                  maxHeight: isOpen ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <p style={{
                    padding: "0 28px 24px",
                    fontSize: 14, lineHeight: 1.8,
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <p style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
          לא מצאת תשובה?{" "}
          <a href="/contact-us" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            צרי קשר
          </a>
          {" "}ונשמח לעזור
        </p>
      </div>
    </section>
  );
}
