import { createClient } from "@/lib/supabase-ssr";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: productsCount }, { count: ordersCount }, { count: categoriesCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, status, total_amount, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "מוצרים", value: productsCount ?? 0, color: "#6366f1" },
    { label: "הזמנות", value: ordersCount ?? 0, color: "#f59e0b" },
    { label: "קטגוריות", value: categoriesCount ?? 0, color: "#10b981" },
  ];

  const statusLabels = {
    pending: "ממתין",
    paid: "שולם",
    shipped: "נשלח",
    delivered: "נמסר",
    cancelled: "בוטל",
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#111" }}>דשבורד</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: 12, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 8px" }}>{stat.label}</p>
            <p style={{ fontSize: 32, fontWeight: 700, color: stat.color, margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#111" }}>הזמנות אחרונות</h3>
        {!recentOrders?.length ? (
          <p style={{ color: "#aaa", fontSize: 14 }}>אין הזמנות עדיין</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <th style={{ textAlign: "right", padding: "8px 0", color: "#888", fontWeight: 500 }}>מזהה</th>
                <th style={{ textAlign: "right", padding: "8px 0", color: "#888", fontWeight: 500 }}>סטטוס</th>
                <th style={{ textAlign: "right", padding: "8px 0", color: "#888", fontWeight: 500 }}>סכום</th>
                <th style={{ textAlign: "right", padding: "8px 0", color: "#888", fontWeight: 500 }}>תאריך</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "10px 0", color: "#555" }}>{order.id.slice(0, 8)}...</td>
                  <td style={{ padding: "10px 0" }}>
                    <span style={{ background: "#f0f0f0", padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td style={{ padding: "10px 0" }}>₪{order.total_amount}</td>
                  <td style={{ padding: "10px 0", color: "#888" }}>{new Date(order.created_at).toLocaleDateString("he-IL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
