// pages/index.tsx

import MainPageMiddle from "@/components/mainPage/herosection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className=" w-[88%]">
      <MainPageMiddle />
    </main>
  );
}