import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { setCookie } from "nookies";
import axios from "axios";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

const handler = NextAuth({
	providers: [
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
			tenantId: process.env.AZURE_AD_TENANT_ID,
			authorization: {
				params: {
					scope: "User.ReadBasic.All User.Read email profile openid offline_access",
				},
			},
			timeout: 3000,
		}),
	],
	callbacks: {
		async signIn(user, account, profile) {
			console.log(profile);
			return true;
		},
		async jwt({ token, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile.id;
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

async function fetchUserProfile(accessToken, userId) {
	const apiUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;
	try {
		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return null;
	}
}

async function fetchUserInfo(accessToken) {
	const apiUrl = "https://graph.microsoft.com/oidc/userinfo";
	try {
		const response = await axios.get(apiUrl, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user info:", error);
		throw error; // Handle error as per your application's logic
	}
}

export { handler as GET, handler as POST };
