'use client'
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem } from '@mui/material'
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../../components/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDisptach } from "@/redux/store";
import { addReservation } from "@/redux/features/resSlice"; 
import { removeReservation } from "@/redux/features/resSlice";
import { reserveItem } from "../../../interface";
import postReservation from "@/libs/postReservation";
import utcPlugin from 'dayjs/plugin/utc';
import { useSession } from "next-auth/react";
import Card from "@/components/Card";
import Image from "next/image";
import postPayment from "@/libs/postPayment";


export default function booking() {
    const urlParams = useSearchParams()
    const rid = urlParams.get('id')
    const rName = urlParams.get('name')
    const { data: session } = useSession()
    //console.log(session?.user.token

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
    const [numberValue, setnumberValue] = useState<number>(0)
    const [payM, setPayM] = useState<string>('')
    const makeBooking = async () => {
        console.log(rid)
        console.log(dayjs(bookDate).format("YYYY-MM-DD"))
        if(!session || !session.user.token) return null
        console.log(dayjs(bookDate).format("YYYY-MM-DD") + "T" + dayjs(bookDate).format("HH:mm:ss")) //    "resvDate": "2024-12-24T22:50:00.000Z"
        if (rid && session) {
            const response = await postReservation(rid, dayjs(bookDate).format("YYYY-MM-DD") + "T" + dayjs(bookDate).format("HH:mm:ss"), session.user.token)
            const reser = response.data._id
            const pay = await postPayment(session.user.token,numberValue,payM,reser)
        }
    }

    return (
        <main className="flex flex-col w-[70%] pl-4">

            <div className='flex flex-row mb-4'>
                <div className='w-[50%] flex flex-col'>

                    <div>
                        <p className="text-4xl mb-16 font-bold">Reserve Table</p>

                        <div className="text-2xl mb-6">
                            Resturant Name 
                        </div>
                        <p className="text-2xl mb-6">{rName}</p>
                        <p className="text-2xl mb-6">Date</p>
                        <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">
                            <DateReserve onDateTimeChange={(value:Date)=>{setBookDate(value)}}/>
                        </p>
                        <div className="text-2xl mb-6">
                            Payments 
                        </div>
                        <p className="text-4xl mb-6">Amount</p>
                        <p className="text-2xl mb-4 inline-block border border-stone-800 p-2">
                            <input type="number" className="MuiInput-input" value={numberValue} onChange={(e)=>{setnumberValue(e.target.valueAsNumber)}}/>
                        </p>
                        <p className="text-4xl mb-6">Payment Method</p>
                        <p className="text-2xl mb-4 inline-block border border-stone-800 p-2">
                        <Select variant="standard" name="hospital" id="hospital" className="h-[2em] w-[200px]" value={payM}
                            onChange={(e)=> {setPayM(e.target.value)}}>
                            <MenuItem value="credit">Credit Card</MenuItem>
                            <MenuItem value="debit">Debit Card</MenuItem>
                            <MenuItem value="banking">Online Banking</MenuItem>
                            <MenuItem value="cash">Cash</MenuItem>
                         </Select>
                        </p>
                    </div>
                </div>

            </div>
            <div className="flex flex-row">
                <Link href="/restaurant" className='w-[20%] mr-4 inline-block'>
                    <button className="text-base w-[100%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Back</button>
                </Link>

                { session? 
                <Link href="/">
                <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={makeBooking}>Reserve Now!</button>
                </Link>:
                <Link href="/login">
                <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={makeBooking}>Reserve Now!</button>
                </Link>
                }
            </div>
        </main>
    );
}