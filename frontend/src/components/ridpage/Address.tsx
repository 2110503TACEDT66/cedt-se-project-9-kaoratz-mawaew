import Map from "./Map"

import { RestaurantItem } from "../../../interface"

export default function Address({restaurantDetails}: {restaurantDetails: RestaurantItem}) {
    return (
        <table className="border-2 border-black w-full">
            <tbody>
            <tr className="border-b-4 border-black">
                <td><Map restaurant={restaurantDetails}/></td>
            </tr>
            <tr className="">
                <td className="p-4">
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