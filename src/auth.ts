import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);

export const { auth, handlers, signIn, signOut } = NextAuth({
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
    adapter: DrizzleAdapter(db)
})