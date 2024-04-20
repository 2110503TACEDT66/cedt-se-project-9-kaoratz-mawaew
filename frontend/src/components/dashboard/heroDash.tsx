import { Button } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import UserHistory from "../userDashboard/userHistory";

export default async function HeroDash() {

    const session = await getServerSession(authOptions);
    let reservationJson = null;
    if (session) {
        reservationJson = await getReservations(session.user.token);
    }
    if (session?.user.role == 'manager') {
        // blah blah
    }
    else {
        // blah blah
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-10 pr-[17%]">
            <div className="text-3xl">
                Dashboard (sprint 2)
            </div>
            <div className="flex flex-row justify-start w-full gap-[2%]">
                <h1 className="text-lg font-bold text-left pl-[10%]">History</h1>
                <div className="bg-black w-full h-[1px] my-auto"></div>
            </div>
            
            
            {
                session? <UserHistory reservation={reservationJson}/> : "No Session"
            }
            <Link href="/addmanager" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                    Add Manager
                </div>
            </Link>
            <Link href="/restaurant/create" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                    Create Restaurant
                </div>
            </Link>

        </div>
    )
}
