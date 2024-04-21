import FormUpdateRestaurant from "@/components/managerDashboard/FormUpdateRestaurant"
import getRestaurant from "@/libs/getRestaurant";

export default async function UpdateRestaurantPage({params}: {params: {rid: string}}){
    const restaurant = await getRestaurant(params.rid);

    return (
        <div className="w-[88%] h-full text-black">
            <FormUpdateRestaurant restaurant={restaurant}/>
        </div>
    );
    
};