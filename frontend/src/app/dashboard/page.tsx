import HeroDash from "@/components/dashboard/heroDash";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import getUserProfile from "@/libs/getUserProfile";
import Manager from "@/components/dashboard/Manager";

export default async function page() {
  const session = await getServerSession(authOptions)
  let profile

  if (session) {
    profile = await getUserProfile(session.user.token)
  }

  if (profile.data.role == 'manager') {
    return (
      <Manager name={profile.data.name}/>
    )
  }
  
  return (
    <div className="w-[88%]">
        <HeroDash />
    </div>
  )
}
