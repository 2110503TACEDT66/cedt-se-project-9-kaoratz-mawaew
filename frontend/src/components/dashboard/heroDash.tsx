import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import getUserProfile from "@/libs/getUserProfile";

import Manager from "../managerDashboard/Manager";

import UserDashboard from "./UserDashboard";
import Admin from "./Admin";

export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    let reservationJson = null;
    let userRole = null;

    const profile = await getUserProfile(session.user.token);
    reservationJson = await getReservations(session.user.token);
    userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);
        
    return (
        <div className="pl-9 w-[100%] ">
            {
                userRole == 'User' ? <UserDashboard profile={profile.data} token={session.user.token} />: null
            }
            {
                userRole == 'Manager' ? <Manager profile={profile.data} token={session.user.token} /> : null
            }
            {
                userRole == 'Admin' ? <Admin profile={profile.data} reservation={reservationJson} /> : null
            }
        </div>
    )
}