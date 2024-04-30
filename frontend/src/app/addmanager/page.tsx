import RegisterManager from "@/components/addManager/Registermanager";
import { authOptions } from "@/components/auth";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
export default async function page() {

  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session?.user.token);

  const userRole = profile.data.role;

  return (
    <div className="w-[88%]">
      <RegisterManager role={userRole} />
    </div>
  )
}
