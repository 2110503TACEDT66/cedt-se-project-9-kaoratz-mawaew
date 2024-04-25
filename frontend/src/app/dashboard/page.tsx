import HeroDash from "@/components/dashboard/heroDash";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import getUserProfile from "@/libs/getUserProfile";
import Manager from "@/components/managerDashboard/Manager";
import { Suspense } from "react";

export default async function page() {
  return (
    <div className="w-[88%]">
      <Suspense fallback={<>Loading...</>}>
        <HeroDash />
      </Suspense>
    </div>
  )
}
