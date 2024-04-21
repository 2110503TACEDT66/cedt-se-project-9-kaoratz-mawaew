import Link from "next/link";
import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import UserHistory from "../userDashboard/userHistory";
import getUserProfile from "@/libs/getUserProfile";
import getRestaurants from "@/libs/getRestaurants";


export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    let reservationJson = null;
    let userRole = null;
    let userName = null;
    let restaurantJson = null;

    if (session) {
        reservationJson = await getReservations(session.user.token);
        restaurantJson = await getRestaurants();
        const profile = await getUserProfile(session.user.token);
        userName = profile.data.name;
        userRole = profile.data.role.charAt(0).toUpperCase() + profile.data.role.slice(1);

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

    return (
        <div className="w-full flex flex-col items-center justify-center gap-10 pr-[17%] ml-[5%]">
            <div className="text-3xl">
                Dashboard (sprint 2)
            </div>
            <div className="text-5xl font-medium">
                Hello {userName} ({userRole})
            </div>
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left">{userRole} dashboard</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/dashboard/profile-setting`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        setting
                    </button>
                </Link>
            </div>
            {
                (userRole == 'User') ? 
                <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                    <h1 className="text-xl font-medium text-left">History</h1>
                    <hr className="border-zinc-900 grow" />
                </div> : "Mgr/Admin dashboard headline"
            
            }
            
            {
                (userRole == 'User') ? <UserHistory reservation={reservationJson} /> : "\nMgr/Admin dashboard component"
            }


            {
                (userRole == 'User') ? <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                    <h1 className="text-xl font-medium text-lef">Comments</h1>
                    <hr className="border-zinc-900 grow" />
                </div> : null
            }
            
            {
                (userRole != 'User') ? <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                    <h1 className="text-xl font-medium text-lef">Restaurant</h1>
                    <hr className="border-zinc-900 grow" />
                    <Link href={`/restaurant/create`}>
                        <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                            hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                            hover:-translate-x-1 hover:-translate-y-1 text-lg">
                            New Restaurant
                        </button>
                    </Link>
                </div> : null
            }

            {
                (userRole == 'Admin') ? 
                <Link href="/addmanager" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                    <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                        Add Manager
                    </div>
                </Link> : null
            }
            
        </div>
    )
}
