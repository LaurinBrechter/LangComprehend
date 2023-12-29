import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            profile(profile) {

                let userRole = "User";
                if (profile?.email == "brechterlaurin@gmail.com") {
                    userRole = "Admin";
                }

                return {
                    ...profile,
                    role: userRole
                }
            },

            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    // database: process.env.DATABASE_URL

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }) {
            // if (session?.user) session.user.role = token.role
            return session
        }
    },
    adapter: PrismaAdapter(prisma)
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }