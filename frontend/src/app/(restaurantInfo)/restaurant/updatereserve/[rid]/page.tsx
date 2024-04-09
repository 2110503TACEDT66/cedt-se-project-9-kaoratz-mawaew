'use client'
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem } from '@mui/material'
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../components/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDisptach } from "@/redux/store";
import { addReservation } from "@/redux/features/resSlice";
import { removeReservation } from "@/redux/features/resSlice";
import { reserveItem } from "../../../../../../interface";
import { useEffect } from "react";
import Image from "next/image";

export default function Update() {
    const urlParams = useSearchParams()
    const rid = urlParams.get('id')
    const name = urlParams.get('name')

    const dispatch = useDispatch<AppDisptach>()
    const now = dayjs().format('ddd D MMM YYYY');
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = dayjs().format('HH:mm');
            setCurrentTime(newTime);

            // Check if the minutes have changed
            const currentMinutes = dayjs().minute();
            if (currentMinutes === 0) {
                // Perform your desired action when minutes change
                console.log('Minutes changed');
            }
        }, 1000); // Update every second

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    const [bookDate, setBookDate] = useState<Date | null>(null)
    const [fName, setfName] = useState<string>('')
    const [lname, setlName] = useState<string>('')
    const [cid, setCid] = useState<string>('')
    const [hName, sethName] = useState<string | null>("Chula")
    const makeBooking = () => {
        if (cid && fName && lname && bookDate && hName) {
            const item: reserveItem = {
                user: fName,
                id: cid,
                restaurant: hName,
                resvDate: dayjs(bookDate).format("YYYY/MM/DD"),
                createdAt: Date.now.toString(),
            }
            console.log(item)
            dispatch(addReservation(item))
            setfName('');
            setlName('');
            setCid('');
            sethName('');
            setBookDate(null);
            // Send alert
            alert('Booking successful!');
        }
    }

    return (
        <main className="flex flex-col w-[70%]">

            <div className='flex flex-row mb-4'>
                <div className='w-[50%] flex flex-col'>
                    <div>
                        <p className="text-4xl mb-16 font-bold">Update Reservation</p>
                        <p className="text-2xl mb-6">Restaurant</p>
                        <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">{name}</p> 
                        {/*restaurant name*/}
                        <p className="text-2xl mb-6">Date</p>
                        <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">{now}</p> 
                        {/*restaurant reserve date*/}
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col mr-9">
                            <p className="text-2xl mb-6 text-left text-stone-800">Time</p>
                            <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">{currentTime}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-2xl mb-6 text-left text-stone-800">Reserve by</p>
                            <p className="text-4xl mb-6 inline-block border border-stone-800 p-2">{rid}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <Image src={"/image_1.png"} alt='' width={0} height={0}
                        className='w-[100%] p-4' />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-4xl mb-16 font-bold">Payment</p>
                <div className="flex flex-row">
                    <div className="flex flex-col mr-9">
                        <p className="text-2xl mb-6 text-left text-stone-800">Date</p>
                        <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">{now}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl mb-6 text-left text-stone-800">Time</p>
                        <p className="text-4xl mb-6 inline-block border border-stone-800 p-2">{currentTime}</p>
                    </div>
                </div>
                <div className="flex flex-row">
                    {/*may be: justify-between*/}
                    <div className="flex flex-col mr-9">
                        <p className="text-2xl mb-6 text-left text-stone-800">Payment Methods</p>
                        <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">credit</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl mb-6 text-left text-stone-800">Total</p>
                        <p className="text-4xl mb-6 inline-block border border-stone-800 p-2">THB: 5,000.00</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <button className="text-base w-[20%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Back</button>
                <button className="text-base w-[60%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Update Now!</button>
                <button className="text-base w-[20%] mb-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Delete</button>

            </div>
        </main>
    );
}