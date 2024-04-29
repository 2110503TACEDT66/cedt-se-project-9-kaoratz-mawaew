import { UserItem } from "../../../interface";
import Link from "next/link";
import UserStatistics from "../userDashboard/userStatistics";
import UserHistory from "../userDashboard/userHistory";
import getReservations from "@/libs/getReservations";
import getUserReviews from "@/libs/getUserReviews";
import { Suspense } from "react";
import HistorySkeleton from "../userDashboard/historySkeleton";
import StatSkeleton from "../userDashboard/StatSkeleton";
import AllCommentCard from "@/components/restaurantSummary/AllCommentCard"

export default async function UserDashboard({ profile, token }: { profile: UserItem, token: string }) {

    const reservation = getReservations(token);
    const reviews = await getUserReviews(profile._id);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-10">
            <div className="text-5xl font-medium">
                Hello, {profile.name}
            </div>
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left">Member Dashboard</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/dashboard/profile-setting`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        setting
                    </button>
                </Link>
            </div>
            <Suspense fallback={<StatSkeleton />}>
                <UserStatistics reservePromise={reservation} />
            </Suspense>
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl text-left font-medium">History</h1>
                <hr className="border-zinc-900 grow" />
            </div>
            <Suspense fallback={<HistorySkeleton />}>
                <UserHistory reservePromise={reservation} />
            </Suspense>
            <div>
                <h1 className="text-xl text-left font-medium">Comments</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="mt-5 mb-10">
                    <AllCommentCard review={reviews} role={profile.role} />
                </div>
            </Suspense>
        </div>
    );
}