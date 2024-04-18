'use client'
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem } from '@mui/material'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import makeBooking from "./ReserveAction";
import getRestaurant from "@/libs/getRestaurant";
import Address from "@/components/ridpage/Address";
import RestaurantData from "./restaurantData";
import Map from "@/components/ridpage/Map";

import { RestaurantJson, RestaurantItem } from "../../../interface";

export default function booking() {
    const urlParams = useSearchParams()
    const rid = urlParams.get('id')
    const { data: session } = useSession()

    const [restaurantData, setRestaurantData] = useState<RestaurantItem | null>(null);

    interface RestaurantJsonHa {
        success: boolean,
        count: number,
        pagination: Object,
        data: RestaurantItem
    }

    const getRestaurantFunction = async (rid: string) => {
        const restaurantJson: RestaurantJsonHa = await getRestaurant(rid);
        let hahaha: RestaurantItem = restaurantJson.data;
        setRestaurantData(hahaha)
    }

    useEffect(() => {


        if (rid) {
            getRestaurantFunction(rid);
        }

        // Clean up interval on component unmount

    }, []);

    const [bookDate, setBookDate] = useState<Date | null>(dayjs().toDate())
    const [numberValue, setnumberValue] = useState<number>(0)


    return (
        <main className="flex flex-col w-[70%] pl-4">

            <div className='flex flex-row mb-4 '>
                <div className='w-[50%] flex flex-col font-mono text-primary'>

                    <div>
                        <p className="text-4xl mb-16 font-mono">Reserve Table</p>
                        {

                            restaurantData ?
                                <div className="flex flex-row w-full">
                                    <div>
                                        <h1 className="text-4xl font-mono mb-12 text-primary text-nowrap">{restaurantData.name}</h1>

                                        <Map restaurant={restaurantData} />

                                        <div className="p-4">
                                            {restaurantData.name}
                                            <p>Address: {restaurantData.address}</p>
                                            <p>Subdistrict: {restaurantData.subdistrict}</p>
                                            <p>District {restaurantData.district}</p>
                                            <p>Province: {restaurantData.province}</p>
                                            <p>Postal Code: {restaurantData.postalcode}</p>
                                            <p>Tel: {restaurantData.tel}</p>
                                        </div>

                                    </div>
                                    <img src={restaurantData.imageUrl} alt="" className="w-full ml-9" />
                                </div>
                                : <div><p>Not found</p></div>
                        }


                        <p className="font-mono">Date&Time</p>
                        <div className="text-4xl mb-4 inline-block border border-stone-800 p-2">
                            <DateReserve onDateTimeChange={(value: Date) => { setBookDate(value) }} />
                        </div>

                    </div>
                </div>

            </div>


            <div className="flex flex-row">
                <Link href="/restaurant" className='w-[20%] mr-4 inline-block'>
                    <button className="text-base w-[100%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Back</button>
                </Link>

                {session && rid ?
                    <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => { makeBooking(rid, bookDate) }}>Reserve Now!</button>
                    :
                    <Link href="/login">
                        <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => { }}>Reserve Now!</button>
                    </Link>
                }
            </div>
        </main>
    );
}