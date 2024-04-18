'use client'
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem } from '@mui/material'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import makeBooking from "./ReserveAction";

export default function booking() {
    const urlParams = useSearchParams()
    const rid = urlParams.get('id')
    const rName = urlParams.get('name')
    const { data: session } = useSession()

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = dayjs().format('HH:mm');

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

    const [bookDate, setBookDate] = useState<Date | null>(dayjs().toDate())
    const [numberValue, setnumberValue] = useState<number>(0)
    const [payM, setPayM] = useState<string>('')

    return (
        <main className="flex flex-col w-[70%] pl-4">

            <div className='flex flex-row mb-4 '>
                <div className='w-[50%] flex flex-col font-mono text-primary'>

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

                { session && rid ? 
                <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => {makeBooking(rid, bookDate, numberValue, payM)}}>Reserve Now!</button>
                :
                <Link href="/login">
                <button className="text-base w-[80%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1" onClick={() => {}}>Reserve Now!</button>
                </Link>
                }
            </div>
        </main>
    );
}