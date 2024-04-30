import { reserveJson } from "../../../interface";
import dayjs from "dayjs";

export default function RestaurantHistory ({reservation, rid} : {reservation : reserveJson, rid: string}) {
    const data = reservation.data;
    
    return (
        <div className="w-full">
            <table className="text-center text-sm w-full items-center border-b-2 border-gray-900">
                <thead>
                    <tr>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date</th>
                        <th className="w-[40%] text-lg py-4 font-semibold border-r-2 border-gray-900">User name</th>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date of Reservation</th>
                        <th className="w-[10%] text-lg py-4 font-semibold border-gray-900">Status</th>
                    </tr>
                </thead>
            </table>
            <div className="w-full overflow-y-scroll max-h-[384px] no-scrollbar">
            <table className="text-center text-sm w-full items-center ">
                <tbody>                   
            {
                data.length > 0 ? data.map((res) => {
                    
                    if (res.restaurant._id != rid) {
                        return null;
                    }
                    
                    return (
                        <tr>
                            <td className="w-[15%] py-4 border-r-2 border-gray-900" suppressHydrationWarning>
                                {dayjs(res.createdAt).format('DD/MM/YY HH:mm:ss')}
                            </td>
                            <td className="w-[40%] py-4 border-r-2 border-gray-900">
                                {res.user.name}
                            </td>
                            <td className="w-[15%] py-4 border-r-2 border-gray-900" suppressHydrationWarning>
                                {dayjs(res.resvDate).format('DD/MM/YY HH:mm:ss')}
                            </td> 
                            <td className="w-[10%] py-4 border-gray-900">
                                {res.completed? <p className="text-emerald-600">Completed</p> : <p className="text-red-600">Upcoming</p>}
                            </td>  
                        </tr>
                        )}) : 
                <tr>
                    <td className="w-[15%] py-4 border-r-2 border-gray-900">
                        No History
                    </td>
                    <td className="w-[40%] py-4 border-r-2 border-gray-900">
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