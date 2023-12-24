import middleware from "next-auth/middleware";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
    console.log(req.nextUrl.pathname)
    // console.log(req.nextauth.token.role)
});

export const config = { mathcher: ["/CreateUser"] }