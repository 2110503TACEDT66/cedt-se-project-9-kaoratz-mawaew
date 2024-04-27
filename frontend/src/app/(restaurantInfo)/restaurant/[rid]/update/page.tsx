import FormUpdateRestaurant from "@/components/managerDashboard/FormUpdateRestaurant"
import getRestaurant from "@/libs/getRestaurant";


type nominatimSmallItem = {
    lat: string,
    lon: string,
}

export default async function UpdateRestaurantPage({params}: {params: {rid: string}}){
    const restaurant = await getRestaurant(params.rid);
    console.log(restaurant);

    return (
        <div className="w-[88%] h-full text-black">
            <FormUpdateRestaurant restaurant={restaurant}/>
        </div>
    );
    
};