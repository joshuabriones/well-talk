const { createRouteHandlerClient } = require("@supabase/auth-helpers-nextjs");
const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function POST(req) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { user, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (user) console.log(user);
  if (error) console.log(error.message);

  return NextResponse.redirect(url.origin);
}
