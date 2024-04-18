import getRestaurant from "@/libs/getRestaurant";
import Address from "@/components/ridpage/Address";
import Map from "@/components/ridpage/Map";

import { RestaurantJson, RestaurantItem} from "../../../interface";


export default function RestaurantData({restaurantDetail}: {restaurantDetail: RestaurantItem}) {

    return (
        <div className="flex flex-row w-full">
            <div>
                <h1 className="text-4xl font-mono mb-12 text-primary text-nowrap">{restaurantDetail.name}</h1>

                <Map restaurant={restaurantDetail}/>
                
                <div className="p-4">
                    {restaurantDetail.name}
                    <p>Address: {restaurantDetail.address}</p>
                    <p>Subdistrict: {restaurantDetail.subdistrict}</p>
                    <p>District {restaurantDetail.district}</p>
                    <p>Province: {restaurantDetail.province}</p>
                    <p>Postal Code: {restaurantDetail.postalcode}</p>
                    <p>Tel: {restaurantDetail.tel}</p>
                </div>
            </div>
            

            <img src={restaurantDetail.imageUrl} alt="" className="w-full ml-9" />
        </div>
    )

}
// 