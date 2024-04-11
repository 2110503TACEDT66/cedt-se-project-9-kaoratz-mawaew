import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/TopBar";
import { RightSideBar } from "@/components/RightSide";
import nextAuth, { getServerSession } from 'next-auth'
import { authOptions } from '../../../components/auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ReduxProvider from '@/redux/ReduxProvider'
import getRestaurants from "@/libs/getRestaurants";
import getUserProfile from "@/libs/getUserProfile";
import { LeftSideBar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

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
        <div className="flex w-full mr-0 pr-0">
          <ReduxProvider>
          <NextAuthProvider session={session}>
            {children}
            <RightSideBar/>
          </NextAuthProvider>
          </ReduxProvider>
        </div>
    )
  }
}