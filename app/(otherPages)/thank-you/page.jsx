import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

export const metadata = {
  title: "תודה — Asserta",
  description: "הזמנתך התקבלה בהצלחה. תודה על הרכישה מ-Asserta.",
};

function generateOrderNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

export default function ThankYouPage() {
  const orderNumber = generateOrderNumber();

  return (
    <div dir="rtl" style={{ backgroundColor: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}>
      <Header1 parentClass="tf-header" />

      <section
        style={{
          minHeight: "calc(100vh - 220px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          background: "linear-gradient(160deg, #0d0d0d 0%, #1a1409 50%, #0d0d0d 100%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 540,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Checkmark circle */}
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "transparent",
              border: "2px solid #4caf82",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 36,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 38,
                color: "#4caf82",
                lineHeight: 1,
                fontWeight: 200,
              }}
            >
              ✓
            </span>
          </div>

          {/* Label */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "#c9a84c",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            הזמנה אושרה
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 200,
              color: "#f0e6cc",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              marginBottom: 22,
            }}
          >
            תודה על הרכישה!
          </h1>

          {/* Confirmation text */}
          <p
            style={{
              fontSize: 15,
              color: "#8a7a60",
              lineHeight: 1.9,
              fontWeight: 300,
              marginBottom: 36,
            }}
          >
            הזמנתך התקבלה בהצלחה.
            <br />
            נשלח אישור למייל שלך בקרוב.
          </p>

          {/* Order number card */}
          <div
            style={{
              background: "linear-gradient(145deg, #1a1614 0%, #141210 100%)",
              border: "1px solid #2a2416",
              borderRadius: 4,
              padding: "22px 40px",
              marginBottom: 44,
              width: "100%",
              maxWidth: 320,
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#6a5a40",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              מספר הזמנה
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 300,
                color: "#c9a84c",
                letterSpacing: "0.12em",
                margin: 0,
              }}
            >
              #{orderNumber}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "linear-gradient(to left, transparent, #2a2416, transparent)",
              marginBottom: 44,
            }}
          />

          {/* CTA Button */}
          <Link
            href="/shop-collection-list"
            style={{
              display: "inline-block",
              padding: "14px 48px",
              background: "transparent",
              border: "1px solid #c9a84c",
              color: "#c9a84c",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 2,
            }}
          >
            המשך קנייה
          </Link>
        </div>
      </section>

      <Footer1 />
    </div>
  );
}
