import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { LeftSideBar, RightSideBar } from "@/components/SideBar";
import nextAuth, { getServerSession } from 'next-auth'
import { authOptions } from '../components/auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ReduxProvider from '@/redux/ReduxProvider'
import getRestaurants from "@/libs/getRestaurants";
import getUserProfile from "@/libs/getUserProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  const restaurant = getRestaurants();

  if (!session || !session.user.token) {
    console.log("session: no session");
    return (
      <html lang="en">
      <body className={inter.className}>
        <TopBar userName={ "whoami (needed login)" } />

        <div className="flex w-[100vw] px-9">
          <ReduxProvider>
          <NextAuthProvider session={session}>
            {children}
          </NextAuthProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
    )
  }
    console.log("session:", session.user.token);
  
    const profile = await getUserProfile(session.user.token)
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar userName={ profile.data.name } />

        <div className="flex flex-row w-[100vw] p-9">
          <ReduxProvider>
          <NextAuthProvider session={session}>
            <LeftSideBar />
            {children}
          </NextAuthProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
