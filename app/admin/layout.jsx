import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Asserta Admin" };

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5", fontFamily: "system-ui, sans-serif" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
