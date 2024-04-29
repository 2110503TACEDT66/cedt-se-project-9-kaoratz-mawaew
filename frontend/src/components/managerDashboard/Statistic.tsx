'use client'
import dayjs from "dayjs";
import { reserveItemForManager, reserveJsonForManager } from "../../../interface";
import { useState } from "react";
import { useEffect } from "react";

const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
};

export default function Statistic({reservation, mid} : {reservation: reserveJsonForManager, mid: string}){
    const data = reservation.data;
    const [current, setCurrent] = useState(0);
    const [reservedSinceLastYear, setReservedSinceLastYear] = useState(0);
    const [alltime, setAlltime] = useState(0);

    useEffect(() => {
        let count = 0;
        let inyear = 0;
        let alltime = 0;
        const currentyear = dayjs().year();

        data.forEach((res: reserveItemForManager) => {
            if (res.restaurant.manager == mid) {
                alltime++;
                if (!res.completed) {
                    count++;
                }
                if (dayjs(res.resvDate, 'YYYY-MM-DDTHH:mm:ss').year() === currentyear){
                    inyear++;
                }
            }
        });
        setCurrent(count);
        setReservedSinceLastYear(inyear);
        setAlltime(alltime);
    }, [data]);

    return(
        <table className="mt-7">
            <tbody>
                <tr>
                    <td className="pr-9 text-base border-r-2 border-black font-mono">
                        <p>Current reservation</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">{formatNumber(current)}</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="px-9 text-base border-r-2 border-black font-mono">
                        <p>In this year</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">{formatNumber(reservedSinceLastYear)}</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="pl-9 text-base font-mono">
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