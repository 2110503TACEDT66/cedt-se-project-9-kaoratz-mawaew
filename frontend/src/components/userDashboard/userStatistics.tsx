// 'use client'
import dayjs from "dayjs";
import { UserItem, reserveJson } from "../../../interface";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
// import { useState } from "react";
// import { useEffect } from "react";

export default async function UserStatistics({ reservePromise

}: {
    reservePromise: Promise<reserveJson>

}) {

    const reservation = await reservePromise;

    const data = reservation.data;
    // const [current, setCurrent] = useState(0);
    // const [reservedSinceLastYear, setReservedSinceLastYear] = useState(0);
    const alltime = reservation.count;
    console.log(reservation.count);

    // useEffect(() => {
    let current = 0;
    let inyear = 0;
    const currentyear = dayjs().year();

    data.forEach((res) => {
        if (!res.completed) {
            current++;
        }
        if (dayjs(res.resvDate, 'YYYY-MM-DDTHH:mm:ss').year() === currentyear) {
            inyear++;
        }
    });
    // setCurrent(count);
    // setReservedSinceLastYear(inyear);
    // }, [data]);
    const formatNumber = (number: number) => {
        return number < 10 ? `0${number}` : number;
    };


    return (
        <table className="h-[10vh]">
            <tbody>
                <tr>
                    <td className="pr-9 text-base border-r-2 border-black">
                        <p>Current reservation</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">{formatNumber(current)}</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="px-9 text-base border-r-2 border-black">
                        <p>In this year</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">{formatNumber(inyear)}</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="pl-9 text-base">
                        <p>For all time</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">{formatNumber(alltime)}</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}