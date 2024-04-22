import { reserveJson } from "../../../interface";
import dayjs from "dayjs";
import Link from "next/link";

export default function AdminHistory ({reservation} : {reservation : reserveJson}) {
    const data = reservation.data;
    
    return (
        <div className="w-full mt-7">
            <table className="text-center text-sm w-full items-center border-b-2 border-gray-900">
                <thead>
                    <tr>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date of Reservation</th>
                        <th className="w-[25%] text-lg py-4 font-semibold border-r-2 border-gray-900">Restaurant</th>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date of Issue</th>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">User</th>
                        <th className="w-[10%] text-lg py-4 font-semibold border-r-2 border-gray-900">Status</th>
                        <th className="w-[10%] text-lg py-4 font-semibold text-center">Review</th>
                    </tr>
                </thead>
            </table>
            <div className="w-full overflow-y-scroll max-h-[384px] no-scrollbar">
            <table className="text-center text-sm w-full items-center ">
                {/* <thead>
                    <tr>
                        <th className="w-[15%] py-4 font-semibold">Date of Reservation</th>
                        <th className="w-[40%] py-4 font-semibold">Restaurant</th>
                        <th className="w-[15%] py-4 font-semibold">Date of Issue</th>
                        <th className="w-[10%] py-4 font-semibold">Status</th>
                        <th className="w-[10%] py-4 font-semibold text-center">Review</th>
                    </tr>
                </thead> */}
                <tbody>                   
            {
                data.length > 0 ? data.map((res) => 
                    <tr>
                        <td className="w-[15%] py-4 border-r-2 border-gray-900" suppressHydrationWarning>
                            {dayjs(res.resvDate).format('DD/MM/YY HH:mm:ss')}
                        </td>
                        <td className="w-[25%] py-4 border-r-2 border-gray-900">
                            {res.restaurant.name}
                        </td>
                        <td className="w-[15%] py-4 border-r-2 border-gray-900" suppressHydrationWarning>
                            {dayjs(res.createdAt).format('DD/MM/YY HH:mm:ss')}
                        </td> 
                        <td className="w-[15%] py-4 border-r-2 border-gray-900">
                            {res.user.name}
                        </td>
                        <td className="w-[10%] py-4 border-r-2 border-gray-900">
                            {res.completed? <p className="text-emerald-600">Completed</p> : <p className="text-red-600">Upcoming</p>}
                        </td>
                        {
                            res.completed? <td className="w-[10%] py-4">
                            <Link href={`/restaurant/${res.restaurant._id}`}>
                                <button className="w-[55px] h-[25px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 text-xs">
                                    Review
                                </button>
                            </Link>
                            </td> : <td className= "w-[10%] py-4">
                                -
                            </td>
                        }
                        
                    </tr>) : 
                <tr>
                    <td className="w-[15%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[25%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[15%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[15%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[10%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[10%] py-4">
                        -
                    </td>
                </tr>
            }
                </tbody>   
            </table>
            </div>
        </div>
        
    )
}