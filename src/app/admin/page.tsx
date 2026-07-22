import { auth } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { SignOutButton } from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/documents");
  if (session.user.role !== "ADMIN") redirect("/library");

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_#dce8e1_0%,_#f4f7f5_55%)]">
      <div className="flex justify-end px-5 pt-5">
        <SignOutButton className="rounded-md border border-[#1a3a2f]/25 px-3 py-1.5 text-sm text-[#1a3a2f] hover:bg-white/50" />
      </div>
      <AdminDashboard userName={session.user.name || session.user.email || "Admin"} />
    </div>
  );
}
