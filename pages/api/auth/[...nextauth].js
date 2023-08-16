import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
export const authOptions = {
  pages: {
    signIn: "/admin/auth/login",
  },

  providers: [
    CredentialsProvider({
      secret: process.env.NEXTAUTH_SECRET,
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email || "",
            credentials.password || ""
          );
          if (userCredential.user) {
            return userCredential.user;
          }
          return null;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
