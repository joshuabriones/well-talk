const { createRouteHandlerClient } = require("@supabase/auth-helpers-nextjs");
const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");

export async function POST(req) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();

  const firstname = formData.get("firstName");
  const email = formData.get("email");
  const idnumber = formData.get("idno");
  const middleinitial = formData.get("middleInitial");
  const lastname = formData.get("lastName");
  const password = formData.get("password");

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  // const { user, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  // });

  const { data, error } = await supabase.from("User").insert([
    {
      user_id: "676a923a-fa98-4bfd-aeea-058efc5a4294",
      firstname: firstname,
      institutionalemail: email,
      idnumber: idnumber,
      middleinitial: middleinitial,
      lastname: lastname,
      password: password,
    },
  ]);

  console.log("Datils", data);
  console.log("Error details", error);

  return NextResponse.redirect(url.origin);
}
