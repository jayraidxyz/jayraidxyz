import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google" || profile?.email_verified !== true) return false;

      const email = profile.email?.trim().toLowerCase();
      if (!email) return false;

      const allowedEmails = process.env.AUTH_ALLOWED_EMAILS?.split(",")
        .map((allowedEmail) => allowedEmail.trim().toLowerCase())
        .filter(Boolean);

      return !allowedEmails || allowedEmails.includes(email);
    },
  },
});
