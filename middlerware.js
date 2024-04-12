import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/(( ?! api |_next/static|_next/image|favicon.ico). *)"],
};

module.exports = middleware;
