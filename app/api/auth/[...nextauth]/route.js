import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { setCookie } from "nookies";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

const handler = NextAuth({
	providers: [
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
			tenantId: process.env.AZURE_AD_TENANT_ID,
			// proxy: process.env.HTTP_PROXY
			// ? { http: process.env.HTTP_PROXY }
			// : undefined,
			timeout: 3000,
		}),
	],
	callbacks: {
		async signIn() {
			// Generate a unique state string
			const state =
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15);

			// Set the state cookie with a 1-hour expiry
			setCookie(null, "nextauth.state", state, {
				maxAge: 3600,
				path: "/",
			});

			// Return the NextAuth signIn response
			return true;
		},
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,

	// adapter: PrismaAdapter(db),
});

export { handler as GET, handler as POST };
