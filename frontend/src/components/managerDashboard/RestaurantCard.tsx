import InteractiveCard from "../InteractiveCard"
import { RestaurantItem } from "../../../interface"

import Image from "next/image"
import dayjs from "dayjs";
import Link from "next/link";
import { useSession } from "next-auth/react"
import getUserProfile from "@/libs/getUserProfile";
export default async function RestaurantCard({restaurantItem,role}: {restaurantItem: RestaurantItem,role:string}) {
    // const manager = await getUserProfile(restaurantItem.manager)
    const [openHour, openMinute] = restaurantItem.opentime.split(":").map(Number);
    const [closeHour, closeMinute] = restaurantItem.closetime
      .split(":")
      .map(Number);
  
    // Create openTime and closeTime using dayjs
    const openTime = dayjs().set("hour", openHour).set("minute", openMinute);
    const closeTime = dayjs().set("hour", closeHour).set("minute", closeMinute);
  
    // Get current time using dayjs
    const currentTime = dayjs();
    
    // Compare current time with openTime and closeTime
    let flag;
    if (openTime < closeTime) {
      if (currentTime >= openTime && currentTime <= closeTime) {
        flag = true;
      } else {
        flag = false;
      }
    } else {
      if (currentTime > closeTime && currentTime < openTime) {
        flag = false;
      } else {
        flag = true;
      }
    }

    return (
        <InteractiveCard>
            <div className="w-[300px] h-[540px] p-3">
                <div className="p-2 w-full h-[40%] relative">
                    {
                    <Image
                        src={restaurantItem.imageUrl}
                        alt="Hospital Picture"
                        width={0} // Set the width of the image
                        height={0} // Set the height of the image
                        objectFit="cover"
                        layout="fill"
                        style={{ borderRadius: "2px" }}
                    />
                    }
                </div>

                <div className="w-full pt-3 h-[60%] flex flex-col gap-[0%] relative">
                    <div className="p-2 flex flex-col h-[80%] overflow-x-auto no-scrollbar">
                    <p className="text-2xl text-left mb-4">{restaurantItem.name}</p>
                        <div className="flex-row flex justify-between items-center mb-4">
                            {flag ? (
                            <p className="text-xs text-green-700 font-bold">OPEN</p>
                            ) : (
                            <p className="text-xs text-red-800 font-bold">CLOSED</p>
                            )}

                            <p className="text-xs">
                            {restaurantItem.opentime} - {restaurantItem.closetime}
                            </p>
                        </div>
                        <div className="flex-row flex justify-between items-center mb-4">
                            <p className="text-base text-left mb-4">Address</p>
                            
                            {
                                role == "admin"?
                                <p className="text-base text-rose-600 font-medium text-right mb-4">{restaurantItem.manager.name}</p>
                                :null
                            }
                        </div>

                        <p className="text-sm text-left pb-4">
                            {restaurantItem.address}, {restaurantItem.subdistrict},{" "}
                            {restaurantItem.district}, {restaurantItem.province},{" "}
                            {restaurantItem.postalcode}
                        </p>
                        <div className="text-sm text-black flex flex-row flex-wrap gap-3">
                            Tags :
                            {restaurantItem.tag?.map((tag, index) => {
                            return (
                                <span key={index} className="">
                                {tag}
                                </span>
                            );
                            })}
                        </div>
                    </div>
                    <hr className="border-zinc-900 grow" />

                    <div className="flex flex-row h-[15%] items-center justify-evenly">
                        <Link href={`restaurant/${restaurantItem.id}/summary`}>
                            <button
                            className="w-[138px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                                    hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                                    hover:-translate-x-1 hover:-translate-y-1">
                            Summary
                            </button>
                        </Link>
                        <Link href={`restaurant/${restaurantItem.id}/update`}>
                            <button
                            className="w-[138px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                                    hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                                    hover:-translate-x-1 hover:-translate-y-1">
                            Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </InteractiveCard>
    )
}