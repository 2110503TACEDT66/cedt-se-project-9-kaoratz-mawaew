import Link from "next/link";

import getRestaurantsForManager from "@/libs/getRestaurantsForManager";
import Stat from "./Stat";
import RestaurantCatalog from "../RestaurantCatalog";
import InteractiveCard from "../InteractiveCard";

import { RestaurantJson } from "../../../interface";

export default async function Manager({name, mid}: {name: string, mid: string}) {
    const restaurants = await getRestaurantsForManager(mid);
    
    return (
        <div className="mx-4 p-9 w-[88%] border-black border-2 ">
            <div className="text-5xl font-bold font-mono">
                <h1>Hello {name}</h1>
            </div>

            <div className="w-full inline-flex items-center space-x-4 mt-7">
                <h1 className="text-xl text-left font-mono">Manager dashboard</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/dashboard/profile-setting`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg font-mono">
                        setting
                    </button>
                </Link>
            </div>

            <Stat/>

            <div className="w-full inline-flex items-center space-x-4 mt-12">
                <h1 className="text-xl text-left font-mono">Restaurant</h1>
                <hr className="border-zinc-900 grow" />
                <Link href={`/restaurant/create`}>
                    <button className="pt-2 pb-2 pl-4 pr-4 border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-lg font-mono">
                        New restaurant
                    </button>
                </Link>
            </div>
            
            

        </div>
    )
}