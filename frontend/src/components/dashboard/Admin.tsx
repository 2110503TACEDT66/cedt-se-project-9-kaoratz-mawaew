import Link from "next/link";
import ManagerStatistics from "../managerDashboard/Statistic";
import { UserItem } from "../../../interface";
import { reserveJson } from "../../../interface";
import AdminHistory from "../adminDashboard/adminHistory";
import getRestaurants from "@/libs/getRestaurants";
import RestaurantCard from "../managerDashboard/RestaurantCard";
import RestaurantNotFound from "../RestaurantNotFound";
import { RestaurantItem } from "../../../interface";

export default async function Admin({profile, reservation}: {profile: UserItem, reservation: reserveJson}) {
    const restaurants = await getRestaurants();

    return (
        <>
            <div className="text-5xl font-semibold">
                <h1>Hello {profile.name}</h1>
            </div>

            <div className="w-full inline-flex items-center space-x-4 mt-7">
                <h1 className="text-xl text-left font-bold">Admin dashboard</h1>
                <hr className="border-zinc-900 grow" />
            </div>

            { <ManagerStatistics reservation={reservation} /> }

            <div className="w-full inline-flex items-center space-x-4 mt-12">
                <h1 className="text-xl text-left font-bold">Restaurant</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/addmanager`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        New Manager
                    </button>
                </Link>
                <Link href={`/restaurant/create`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        New restaurant
                    </button>
                </Link>
            </div>

            <div className="w-full overflow-y-scroll max-h-[580px] flex items-start justify-center mt-14">
                {restaurants.count > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 text-black">
                        {restaurants.data.reverse().map(
                            (restaurantItem: RestaurantItem) => (
                                <RestaurantCard key={restaurantItem._id} restaurantItem={restaurantItem} role="admin"/>
                            )
                        )}
                    </div>
                ) : (
                    <RestaurantNotFound />
                )}
            </div>

            <div className="w-full inline-flex items-center space-x-4 mt-12">
                <h1 className="text-xl text-left font-bold">History</h1>
                <hr className="border-zinc-900 grow" />
            </div>

            <AdminHistory profile={profile} reservation={reservation} />
        </>
    )
}