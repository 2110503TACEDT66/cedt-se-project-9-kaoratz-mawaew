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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}