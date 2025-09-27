import { NextRequest, NextResponse } from "next/server";

export function authUser(req: NextRequest) {
  const token = req.cookies.get("userToken");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return null;
}
