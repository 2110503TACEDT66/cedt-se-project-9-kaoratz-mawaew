// pages/index.tsx

import MainPageMiddle from "@/components/mainpage/herosection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    const profile = await getUserProfile(session?.user.token)
    login(profile.data.role)
  }

  return (
    <main className=" w-[88%]">
      <MainPageMiddle />
    </main>
  );
}

const login = (role: string) => {
  if (role == 'manager' || role == 'admin') {
    redirect('/dashboard')
  }

  if (role == 'user') {
    redirect('/restaurant')
  }
}