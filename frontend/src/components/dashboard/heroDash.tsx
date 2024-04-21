import Link from "next/link";
import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import UserHistory from "../userDashboard/userHistory";
import allComments from "../userDashboard/allComments";
import UserStatistics from "../userDashboard/userStatistics";
import getUserProfile from "@/libs/getUserProfile";
import getRestaurants from "@/libs/getRestaurants";
import getUserReviews from "@/libs/getUserReviews";
import { reserveItem, RestaurantItem } from "../../../interface";
import ManagerStatistics from "../managerDashboard/Statistic";
import { profile } from "console";

import Manager from "../managerDashboard/Manager";
import { UserItem } from "../../../interface";


import UserDashboard from "./UserDashboard";
import Admin from "./Admin";



export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    let reservationJson = null;
    let userRole = null;
    let userName = null;
    let userUID = null;
    let restaurantJson = null;
    let reviewsJson = null;


    
    reservationJson = await getReservations(session.user.token);
    restaurantJson = await getRestaurants();
    const profile = await getUserProfile(session.user.token);
    userName = profile.data.name;
    userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);
    console.log(JSON.stringify(reservationJson));
        
    


    if (userRole == 'Manager') {
        return (
            <Manager profile={profile.data} reservation={reservationJson}/>
        )
    }


    return (
        <div className="mx-4 p-9 w-[88%] border-black border-2">
            {
                userRole == 'User' ? <UserDashboard profile={profile.data} reservation={reservationJson} />: null
            }
            {
                userRole == 'Manager' ? <Manager profile={profile.data} reservation={reservationJson} /> : null
            }
            {
                userRole == 'Admin' ? <Admin profile={profile.data} reservation={reservationJson} /> : null
            }
        </div>
    )
}