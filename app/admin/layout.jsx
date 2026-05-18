import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Asserta Admin" };

export default function AdminLayout({ children }) {
  return <AdminNav>{children}</AdminNav>;
}
