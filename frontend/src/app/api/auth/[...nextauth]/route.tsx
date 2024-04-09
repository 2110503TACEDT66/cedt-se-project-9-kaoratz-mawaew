import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";
import { authOptions } from "../../../../components/auth";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }