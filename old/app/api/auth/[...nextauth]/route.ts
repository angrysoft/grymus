import NextAuth, { Awaitable, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Hasło", type: "password", placeholder: "hasło" },
      },
      authorize: async (credentials, req) => {
        //FIXME for development, remove
        // -------------------------------------------------
        if (
          credentials?.username === process.env.ADMIN &&
          credentials?.password === process.env.ADMIN_PASSWD
        ) {
          return { name: "admin", id: "0" };
        }
        // ------------------------------------------------
        if (credentials?.username && credentials?.password) {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.username,
            },
          });

          if (user?.active) {
            const passwordCorrect = await compare(
              credentials?.password,
              user?.password,
            );
            if (passwordCorrect) {
              return {
                id: user.id.toString(),
                active: user.active,
                email: user.email,
              };
            }
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };