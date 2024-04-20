import { reserveJson } from "../../../interface";
import dayjs from "dayjs";

export default function UserHistory ({reservation} : {reservation : reserveJson}) {
    const data = reservation.data;
    return (
        
            <table className="text-left w-[80%] items-center">
                <tr>
                    <th className="pr-[10%] py-4 font-semibold">Date of Issue</th>
                    <th className="pr-[60%] py-4 font-semibold">Restaurant</th>
                    <th className="pr-[10%] py-4 font-semibold">Date of Reservation</th>
                    <th className="pr-[10%] py-4 font-semibold">Status</th>
                </tr>
                       
            {
                data? data.map((res) => <tr className="my-5">
                        <td className="pr-[10%] py-4">
                            {dayjs(res.createdAt).format('DD/MM/YY')}
                        </td>
                        <td className="pr-[60%] py-4">
                            {res.restaurant.name}
                        </td>
                        <td className="pr-[10%] py-4">
                            {dayjs(res.resvDate).format('DD/MM/YY')}
                        </td> 
                        <td className="pr-[10%] py-4">
                            {res.completed? "Completed" : "Upcoming"}
                        </td>
                    
                </tr>) : 
                <tr>
                    <td className="pr-[10%] py-4">
                        No History
                    </td>
                    <td className="pr-[60%] py-4">
                        No History
                    </td>
                    <td className="pr-[10%] py-4">
                        No History
                    </td>
                    <td className="pr-[60%] py-4">
                        No History
                    </td>
                </tr>
            }
            </table>
        
    )
}