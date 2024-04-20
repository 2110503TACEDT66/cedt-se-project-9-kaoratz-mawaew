import { reserveJson } from "../../../interface";
import dayjs from "dayjs";
import Link from "next/link";

export default function UserHistory ({reservation} : {reservation : reserveJson}) {
    const data = reservation.data;
    return (
        
        <div className="w-full pl-[10%]">
            <table className="text-left text-xs w-full items-center">
                <thead>
                    <tr>
                        <th className="w-[15%] py-4 font-semibold">Date of Issue</th>
                        <th className="w-[40%] py-4 font-semibold">Restaurant</th>
                        <th className="w-[15%] py-4 font-semibold">Date of Reservation</th>
                        <th className="w-[10%] py-4 font-semibold">Status</th>
                        <th className="w-[10%] py-4 font-semibold text-center">Review</th>
                    </tr>
                </thead>
                <tbody>                   
            {
                data? data.map((res) => 
                    <tr>
                        <td className="w-[15%] py-4" suppressHydrationWarning>
                            {dayjs(res.createdAt).format('DD/MM/YY')}
                        </td>
                        <td className="w-[40%] py-4">
                            {res.restaurant.name}
                        </td>
                        <td className="w-[15%] py-4" suppressHydrationWarning>
                            {dayjs(res.resvDate).format('DD/MM/YY')}
                        </td> 
                        <td className="w-[10%] py-4">
                            {res.completed? "Completed" : "Upcoming"}
                        </td>
                        <td className="w-[10%] py-4 text-center">
                            <Link href={`/restaurant/${res.restaurant._id}`}>
                                <button className="w-[81px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">
                                    Review
                                </button>
                            </Link>
                        </td>
                    </tr>) : 
                <tr>
                    <td className="w-[15%] py-4">
                        No History
                    </td>
                    <td className="w-[40%] py-4">
                        No History
                    </td>
                    <td className="w-[15%] py-4">
                        No History
                    </td>
                    <td className="w-[10%] py-4">
                        No History
                    </td>
                    <td className="w-[10%] py-4">
                        Review
                    </td>
                </tr>
            }
                </tbody>   
            </table>
        </div>
        
    )
}