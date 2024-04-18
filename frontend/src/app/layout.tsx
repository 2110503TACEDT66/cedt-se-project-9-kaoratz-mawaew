import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { LeftSideBar } from "@/components/SideBar";
import { getServerSession } from 'next-auth'
import { authOptions } from '../components/auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import getUserProfile from "@/libs/getUserProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaoratz Eatery Service",
  description: "Generated by 9 Kaoratz Mawaew",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  const isSessionValid = session && session.user.token;
  let userName = "whoami";

  if(!isSessionValid) {
    userName = "whoami (needed login)";
  } else {
    const profile = await getUserProfile(session.user.token);
    userName = profile.data.name;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar userName={userName} />
        <div className="flex w-[100%] px-9">
          <NextAuthProvider session={session}>
            <LeftSideBar />
            {children}
          </NextAuthProvider>
        </div>
      </body>
    </html>

  );
}
