'use client'

import DateReserve from "@/components/DateReserve";
import { CircularProgress } from '@mui/material'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import makeBooking from "./ReserveAction";
import getRestaurant from "@/libs/getRestaurant";
import Map from "@/components/ridpage/Map";

import { RestaurantItem } from "../../../interface";
import Image from "next/legacy/image";

import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";

export default function Booking({
    rid,
    restaurantData
}:{
    rid: string,
    restaurantData: RestaurantItem
}) {

    type RestaurantJsonHa = {
        success: boolean,
        count: number,
        pagination: Object,
        data: RestaurantItem
    }

    const router = useRouter();

    // const urlParams = useSearchParams()
    // const rid = urlParams.get('id')
    const { data: session } = useSession()

    // const [restaurantData, setRestaurantData] = useState<RestaurantItem | null>(null);
    const [toastState, setToastState] = useState(false);
    
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setToastState(false);
      };

    // const getRestaurantFunction = async (rid: string) => {
    //     const restaurantJson: RestaurantJsonHa = await getRestaurant(rid);
    //     let restaurantItem: RestaurantItem = restaurantJson.data;
    //     setRestaurantData(restaurantItem)
    // }

    // useEffect(() => {

    //     if (rid) {
    //         getRestaurantFunction(rid);
    //     }

    // }, [rid]);

    const [bookDate, setBookDate] = useState<Date | null>(dayjs().toDate())


    return (
        <main className="flex flex-col w-[88%] pl-4">

            <div className='w-full flex flex-row mb-4 '>
                <div className='w-full flex flex-col font-mono text-primary p-10 gap-10'>
                    
                    <div className='flex flex-row justify-center items-center gap-5 mb-14'>
                        <h1 className="text-4xl font-bold text-primary text-nowrap">Reserve Table</h1>
                        <hr className='border-black border-1 flex-grow '/>
                    </div>

                    {

                        restaurantData ?
                            <>
                                <h1 className="text-2xl font-mono mb-1 text-primary text-nowrap">{restaurantData.name}</h1>
                                
                                <div className="flex flex-row h-max w-full gap-[4%] mb-4">
                                    <div className="w-[50%] h-full flex flex-col">

                                        <div className="w-full relative h-[175px] mb-4 border-2 border-black">
                                            <Map restaurant={restaurantData} />
                                        </div>
                                        <div className="p-4 bg-gray-200 h-max border-2 border-black">
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

                    <div className="w-full flex flex-col justify-center items-center text-lg mb-11">
                        <p className="text-2xl font-mono mb-2">Date & Time</p>
                        <DateReserve onDateTimeChange={(value: Date) => { setBookDate(value) }} />
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
                        hover:-translate-x-1 hover:-translate-y-1" onClick={ async () => { 
                            const res = await makeBooking(rid, bookDate);
                            if(res == null) {
                                setToastState(true);
                            } else{
                                router.push("/myTable");
                            }
                        }}>Reserve Now!</button>
                    :
                    <Link href="/login" className="w-full">
                        <button className="text-base w-[80%] mb-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => { }}>Reserve Now!</button>
                    </Link>
                }

            <Snackbar
                    open={toastState}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Failed to Post Reservation"
                />
            </div>
        </main>
    );
}