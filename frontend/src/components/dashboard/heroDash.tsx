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
import ManagerStatistics from "../managerDashboard/ManagerStatistic";
import { profile } from "console";
import Manager from "./Manager";
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

<<<<<<< HEAD
    if (session) {
        reservationJson = await getReservations(session.user.token);
        restaurantJson = await getRestaurants();
        const profile = await getUserProfile(session.user.token);
        reviewsJson = await getUserReviews(profile.data._id);
        userName = profile.data.name;
        userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);
        // userUID = await getUserReviews(profile.data._id);
        console.log(JSON.stringify(reservationJson));
        console.log(JSON.stringify(reviewsJson));
        // switch (profile.data.role) {
        //     case 'manager': {
        //         userRole = 'manager';
        //         break;
        //     }
        //     case 'user': {
        //         userRole = 'user';
        //         break;
        //     }
        //     case 'admin': {
        //         userRole = 'admin';
        //         break;
        //     }
        // }
    }
=======
    
    reservationJson = await getReservations(session.user.token);
    restaurantJson = await getRestaurants();
    const profile = await getUserProfile(session.user.token);
    userName = profile.data.name;
    userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);
    console.log(JSON.stringify(reservationJson));
        
    
>>>>>>> a4b93c918781a766c4052479d386e2e609b4d5e9

    return (
        <div className="mx-4 p-9 w-[88%] border-black border-2">
            {
                userRole == 'User' ? <UserDashboard profile={profile.data} reservation={reservationJson} />: null
            }
            {
                userRole == 'Manager' ? <Manager profile={profile.data} reservation={reservationJson} /> : null
            }
            {
<<<<<<< HEAD
                (userRole == 'User') ? <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                    <h1 className="text-xl text-left font-bold">Comments</h1>
                    <hr className="border-zinc-900 grow" />
                    <div>
                    <allComments reviewsJson={reviewsJson} />
                    </div>
                </div> : null
=======
                userRole == 'Admin' ? <Admin profile={profile.data} reservation={reservationJson} />: null
>>>>>>> a4b93c918781a766c4052479d386e2e609b4d5e9
            }
        </div>
    )
}