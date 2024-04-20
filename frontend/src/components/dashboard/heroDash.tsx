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
        <div className="w-full flex flex-col items-center justify-center gap-10 pr-[17%] ml-[5%]">
            <div className="text-3xl">
                Dashboard (sprint 2)
            </div>
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left ">Member dashboard</h1>
                <hr className="border-zinc-900 grow" />
                <Button className="">setting</Button>
            </div>
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left">History</h1>
                <hr className="border-zinc-900 grow" />
            </div>
            
            {
                session? <UserHistory reservation={reservationJson}/> : "No Session"
            }
            
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-lef">Comments</h1>
                <hr className="border-zinc-900 grow" />
            </div>

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
