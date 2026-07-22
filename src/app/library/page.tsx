import { auth } from "@/lib/auth";
import { LibraryBrowser } from "@/components/LibraryBrowser";
import { SignOutButton } from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function LibraryPage() {
  const session = await auth();
  if (!session?.user) redirect("/documents");
  if (session.user.role === "ADMIN") redirect("/admin");

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_#d9e0ea_0%,_#f0f3f7_55%)]">
      <div className="flex justify-end px-5 pt-5">
        <SignOutButton className="rounded-md border border-[#243447]/25 px-3 py-1.5 text-sm text-[#243447] hover:bg-white/50" />
      </div>
      <LibraryBrowser userName={session.user.name || session.user.email || "User"} />
    </div>
  );
}
