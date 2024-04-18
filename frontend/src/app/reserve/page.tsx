'use client'

import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, CircularProgress } from '@mui/material'
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
import Image from "next/image";

export default function booking() {

    type RestaurantJsonHa = {
        success: boolean,
        count: number,
        pagination: Object,
        data: RestaurantItem
    }

    const urlParams = useSearchParams()
    const rid = urlParams.get('id')
    const { data: session } = useSession()

    const [restaurantData, setRestaurantData] = useState<RestaurantItem | null>(null);


    const getRestaurantFunction = async (rid: string) => {
        const restaurantJson: RestaurantJsonHa = await getRestaurant(rid);
        let restaurantItem: RestaurantItem = restaurantJson.data;
        setRestaurantData(restaurantItem)
    }

    useEffect(() => {

        if (rid) {
            getRestaurantFunction(rid);
            console.log(restaurantData);
        }

    }, []);

    const [bookDate, setBookDate] = useState<Date | null>(dayjs().toDate())
    const [numberValue, setnumberValue] = useState<number>(0)


    return (
        <main className="flex flex-col w-[88%] pl-4">

            <div className='w-full flex flex-row mb-4 '>
                <div className='w-full flex flex-col font-mono text-primary p-10'>


                    <p className="text-4xl mb-16 font-mono">Reserve Table</p>
                    {

                        restaurantData ?
                            <>
                                <h1 className="text-3xl font-mono mb-12 text-primary text-nowrap">{restaurantData.name}</h1>
                                <div className="flex flex-row h-max w-full gap-[2%]">
                                    <div className="w-[55%] h-full flex flex-col border-2 border-black">

                                        <div className="w-full relative h-[50vh]">
                                            <Map restaurant={restaurantData} />
                                        </div>
                                        <div className="p-4 bg-gray-200 h-max">
                                            <p>Address: {restaurantData.address}</p>
                                            <p>Subdistrict: {restaurantData.subdistrict}</p>
                                            <p>District {restaurantData.district}</p>
                                            <p>Province: {restaurantData.province}</p>
                                            <p>Postal Code: {restaurantData.postalcode}</p>
                                            <p>Tel: {restaurantData.tel}</p>
                                        </div>

                                    </div>
                                    <div className="w-[50%] relative">
                                        <Image
                                            src={restaurantData.imageUrl}
                                            alt="restaurant image"
                                            width={0}
                                            height={0}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                            </>
                            : <div className="w-full h-[50vh] flex flex-row justify-center items-center">
                                <CircularProgress />
                            </div>
                    }

                    <div className="w-full flex flex-col justify-center items-start mt-5 gap-5 text-lg">
                        <p className="font-mono">Date & Time</p>
                        <div className="text-4xl mb-4 inline-block border border-stone-800 p-2">
                            <DateReserve onDateTimeChange={(value: Date) => { setBookDate(value) }} />
                        </div>


                    </div>
                </div>

            </div>


            <div className="flex flex-row px-10 w-full">
                <Link href="/restaurant" className='w-[20%] mr-4 inline-block'>
                    <button className="text-base w-[100%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Back</button>
                </Link>

                {session && rid ?
                    <button className="text-base w-[80%] mb-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => { makeBooking(rid, bookDate) }}>Reserve Now!</button>
                    :
                    <Link href="/login" className="w-full">
                        <button className="text-base w-[80%] mb-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => { }}>Reserve Now!</button>
                    </Link>
                }
            </div>
        </main>
    );
}