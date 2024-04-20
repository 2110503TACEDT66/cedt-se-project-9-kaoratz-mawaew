import dayjs from "dayjs";
import { reserveJson } from "../../../interface";

export default function RestaurantStatistics({reservation} : {reservation: reserveJson}){
    const data = reservation.data;
    return(
        <div className="w-full pl-[10%]">
            <table className="text-left w-[80%] items-center border-2">
                <thead>
                    <tr>
                        <th className="py-4 font-semibold">Current Reservation</th>
                        <th className="pr-[10%] py-4 font-semibold">In this year</th>
                        <th className="pr-[10%] py-4 font-semibold">For All time</th>
                    </tr>
                </thead>
                <tbody>
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
                    </tr>
                
                </tbody>
                </table>
            </div>
    );
}