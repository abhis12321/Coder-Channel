import { NextResponse } from "next/server";


export function middleware(req) {
    if(req.nextUrl.pathname === "/logout") {
        req.cookies.delete("coder-channel-login-info")
        console.log(req.cookies.get("coder-channel-login-info"));
    }
    return NextResponse.next();
}