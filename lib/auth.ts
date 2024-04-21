// import { MicrosoftEntraId } from "arctic";
// import { generateCodeVerifier, generateState } from "arctic";

// const entraId = new MicrosoftEntraId(
//   process.env.AZURE_AD_TENANT_ID,
//   process.env.AZURE_AD_CLIENT_ID,
//   process.env.AZURE_AD_CLIENT_SECRET,
//   redirectURI
// );

// const state = generateState();
// const codeVerifier = generateCodeVerifier();
// const url = await entraId.createAuthorizationURL(state, codeVerifier);

// // store state verifier as cookie
// setCookie("state", state, {
//   secure: true, // set to false in localhost
//   path: "/",
//   httpOnly: true,
//   maxAge: 60 * 10, // 10 min
// });

// // store code verifier as cookie
// setCookie("code_verifier", codeVerifier, {
//   secure: true, // set to false in localhost
//   path: "/",
//   httpOnly: true,
//   maxAge: 60 * 10, // 10 min
// });

// return redirect(url);
