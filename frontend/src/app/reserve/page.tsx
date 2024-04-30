import Booking from "./reserveSection";
import { RestaurantItem } from "../../../interface";
import getRestaurant from "@/libs/getRestaurant";





export default async function page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  type RestaurantJsonHa = {
    success: boolean,
    count: number,
    pagination: Object,
    data: RestaurantItem
  }
  const resId : string = searchParams.id as string;

  if(!resId) return null

  const restaurant : RestaurantJsonHa = await getRestaurant(resId as string);
  const restaurantData : RestaurantItem = restaurant.data;

  
  return (
    <Booking rid={resId} restaurantData={restaurantData} />
  )
}
