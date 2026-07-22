import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { resolveRole } from "@/lib/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/documents",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const role = resolveRole(user.email);
        token.id = user.id;
        token.role = role;
        if (user.id) {
          await prisma.user
            .update({
              where: { id: user.id },
              data: { role },
            })
            .catch(() => undefined);
        }
      } else if (token.email) {
        token.role = resolveRole(token.email as string);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "ADMIN" | "USER") || "USER";
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const role = resolveRole(user.email);
      await prisma.user.update({
        where: { id: user.id },
        data: { role },
      });
    },
  },
});
