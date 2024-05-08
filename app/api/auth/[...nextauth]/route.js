import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/lib/db";

const handler = NextAuth({
  providers: [
    // to implement if kaya HAHAHAH
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          // Find user by email
          if (!email) {
            console.error("Missing email in credentials");
            return null;
          }

          const user = await db.user.findUnique({
            where: { institutionalEmail: email },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          // kani na line returns the logged in user's data to the SESSION callback
          return {
            id: user.id.toString(),
            name: `${user.firstName} ${user.lastName} ${user.gender} ${user.password} ${user.role} ${user.id} ${user.idNumber}`,
            email: user.institutionalEmail,
            image: user.image,
            idNumber: user.idNumber,
            gender: user.gender,
            password: user.password,
            role: user.role,
          };
        } catch (error) {
          console.error("Error authenticating user:", error);
          return null; // Or throw an appropriate error
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user) {
        console.error("Missing user in session");
        return null;
      }
      // dire sa SESSION callback ari nato gidawat ang gipasa na user data from AUTHORIZE
      // check session sa brwoser network to see the fetched data
      const { user } = session;
      session.user.id = user.name.split(" ")[5];
      session.user.idNumber = user.name.split(" ")[3];
      session.user.role = user.name.split(" ")[4];
      session.user.email = user.email;
      session.user.name = `${user.name.split(" ")[0]} ${user.name.split(" ")[1]}`;
      session.user.image = user.image;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

