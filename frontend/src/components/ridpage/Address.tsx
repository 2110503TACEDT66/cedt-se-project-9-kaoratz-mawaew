import Map from "./Map"

import { RestaurantItem } from "../../../interface"

export default function Address({restaurantDetails}: {restaurantDetails: RestaurantItem}) {
    return (
        <table className="border-2 border-black w-full h-full">
            <tbody>
            <tr className="border-b-2 border-black h-[65%]">
                <td><Map restaurant={restaurantDetails}/></td>
            </tr>
            <tr className="h-[35%] text-lg  ">
                <td className="p-4 ">
                    {restaurantDetails.name}
                    <p>Address: {restaurantDetails.address}</p>
                    <p>Subdistrict: {restaurantDetails.subdistrict}</p>
                    <p>District {restaurantDetails.district}</p>
                    <p>Province: {restaurantDetails.province}</p>
                    <p>Postal Code: {restaurantDetails.postalcode}</p>
                    <p>Tel: {restaurantDetails.tel}</p>
                </td>
            </tr>
            </tbody>
        </table>
    )
} 