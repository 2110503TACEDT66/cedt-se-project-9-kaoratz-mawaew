import Link from "next/link";
import { UserItem, RestaurantItem } from "../../../interface";
import getRestaurantsForManager from "@/libs/getRestaurantsForManager";
import getRestaurantReservation from "@/libs/getRestaurantReservation";
import RestaurantCard from "./RestaurantCard";
import RestaurantNotFound from "../RestaurantNotFound";
import Statistics from "./Statistic";
import React from "react";

export default async function Manager({profile, token}: {profile: UserItem, token: string}) {

    if(!profile ||profile.role !== 'manager') return (
        <h1 data-TestId='notManager'>can not access</h1>
    );
    const restaurants = await getRestaurantsForManager(profile._id)
    const reservations = await getRestaurantReservation(token)
    return (
        <div className="w-full p-9 border-2 border-black">
            <div className="text-5xl font-bold">
                <h1>Hello {profile.name}</h1>
            </div>

            <div className="w-full inline-flex items-center space-x-4 mt-7">
                <h1 className="text-xl text-left font-bold">Manager dashboard</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/dashboard/profile-setting`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        setting
                    </button>
                </Link>
            </div>

            <Statistics reservation={reservations} mid={profile._id}/>

            <div className="w-full inline-flex items-center space-x-4 mt-12">
                <h1 className="text-xl text-left font-bold">Restaurant</h1>
                <hr className="border-zinc-900 grow" />
                <Link id="add" href={`/restaurant/create`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg">
                        New restaurant
                    </button>
                </Link>
            </div>

            <div>
            <div className="flex items-start justify-center mt-14">
                {restaurants.count > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 text-black">
                    {restaurants.data.reverse().map(
                        (restaurantItem: RestaurantItem) => (
                            <RestaurantCard key={restaurantItem._id} restaurantItem={restaurantItem} role="manager"/>
                        )
                    )}
                    </div>
                ) : (
                    <RestaurantNotFound />
                )}
                </div>
            </div>
        </div>
    )
}