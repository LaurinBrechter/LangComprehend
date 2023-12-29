import middleware from "next-auth/middleware";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
});

export const config = { matcher: [] }