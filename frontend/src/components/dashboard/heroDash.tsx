import { Button } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import UserHistory from "../userDashboard/userHistory";
import getUserProfile from "@/libs/getUserProfile";
import { RightSideBar } from "../RightSide";
import RestaurantStatistics from "../managerDashboard/RestaurantStatistic";
import getRestaurants from "@/libs/getRestaurants";
import RestaurantNotFound from "../RestaurantNotFound";

export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token);
    const reservationJson = await getReservations(session.user.token);
    
    if (profile.data.role == 'manager') {
        // blah blah
    }
    else {
        // blah blah
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-10 pr-[17%]">
            
            {
                profile.data.role == "user"?  <> <div className="text-3xl">
                        Dashboard (sprint 2)
                    </div>
                    
                    <div className="flex flex-row justify-start w-full gap-[2%]">
                        <h1 className="text-lg font-bold text-left pl-[10%]">Summary</h1>
                        <div className="bg-black w-full h-[1px] my-auto"></div>
                    </div>

                    <div className="flex flex-row justify-start w-full gap-[2%]">
                        <h1 className="text-lg font-bold text-left pl-[10%]">History</h1>
                        <div className="bg-black w-full h-[1px] my-auto"></div>
                    </div>
                    
                    <UserHistory reservation={reservationJson}/>
                </>: null
            }


            {
                profile.data.role == "manager"?  <> <div className="font-semibold w-full text-left pl-[10%] text-3xl gap-[2%]">
                        {`Hello ${profile.data.name}`}
                    </div>
                    
                    <div className="flex flex-row justify-start w-full gap-[2%] ">
                        <h1 className="text-lg w-auto font-bold text-left pl-[10%] pt-0.5">Manager dashboard</h1>
                        <hr className='border-black border-1 flex-grow my-auto' />
                        <button className="font-mono text-lg border-2 px-4">
                            setting 
                        </button>
                    </div>

                    <RestaurantStatistics reservation={reservationJson} />

                    <div className="flex flex-row justify-start w-full gap-[2%]">
                        <h1 className="text-lg font-bold text-left pl-[10%] pt-0.5">Restaurant</h1>
                        <hr className='border-black border-1 flex-grow my-auto' />
                        <button className="font-mono text-lg border-2 px-4">
                            New restaurant 
                        </button>
                    </div>
                    
                    <Link href="/addmanager" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                    <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                        Add Manager
                    </div>
            </Link>
                    
                </>: null
            }

            {
                profile.data.role == "admin"? <></>: null
            }
            
            
            <Link href="/restaurant/create" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                    Create Restaurant
                </div>
            </Link>

        </div>
    )
}
