import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Hasło", type: "password", placeholder: "hasło" },
      },
      async authorize(credentials, req) {
        
        //FIXME for develpnet remove
        if (
          credentials?.username === process.env.ADMIN &&
          credentials?.password === process.env.ADMIN_PASSWD
        )
          return { name: "admin", id: "0" };

        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        // If no error and we have user data, return it
        if (res.ok && data.success && data.data) {
          return data.data.user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
