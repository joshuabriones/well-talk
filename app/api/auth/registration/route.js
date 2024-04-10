const { createRouteHandlerClient } = require("@supabase/auth-helpers-nextjs");
const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function POST(req) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();

  const firstname = formData.get("firstName");
  const institutionalemail = formData.get("email");
  const idnumber = formData.get("idno");
  const middleinitial = formData.get("middleInitial");
  const lastname = formData.get("lastName");
  const password = formData.get("password");

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signUp({
    firstname,
    institutionalemail,
    idnumber,
    middleinitial,
    lastname,
    password,
    options: {
      emailRedirectTo: `${url.origin}/auth/callback`,
    },
  });

  return NextResponse.redirect(url.origin);
}
