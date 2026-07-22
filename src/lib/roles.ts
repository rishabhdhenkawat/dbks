export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}

export function resolveRole(email: string | null | undefined): "ADMIN" | "USER" {
  return isAdminEmail(email) ? "ADMIN" : "USER";
}
