import Link from "next/link";
import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import UserHistory from "../userDashboard/userHistory";
import Comment from "postcss/lib/comment";
import UserStatistics from "../userDashboard/userStatistics";
import getUserProfile from "@/libs/getUserProfile";
import getRestaurants from "@/libs/getRestaurants";
import getUserReviews from "@/libs/getUserReviews";
import { reserveItem, RestaurantItem } from "../../../interface";
import ManagerStatistics from "../managerDashboard/ManagerStatistic";
import { profile } from "console";
import Manager from "./Manager";


export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    let reservationJson = null;
    let userRole = null;
    let userName = null;
    let userUID = null;
    let restaurantJson = null;

    
    reservationJson = await getReservations(session.user.token);
    restaurantJson = await getRestaurants();
    const profile = await getUserProfile(session.user.token);
    userName = profile.data.name;
    userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);
    console.log(JSON.stringify(reservationJson));
        
    

    return (
        <div className="mx-4 p-9 w-[88%] border-black border-2">
            {/* {
                userRole == 'User' ? 
            } */}
            {
                userRole == 'Manager' ? <Manager profile={profile.data} reservation={reservationJson} /> : null
            }
            {/* {
                userRole == 'Admin' ? 
            } */}
        </div>
    )
}