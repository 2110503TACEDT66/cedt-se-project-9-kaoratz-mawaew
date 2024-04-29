import Card from "./Card";
import { RestaurantJson, RestaurantItem } from "../../interface";
import RestaurantNotFound from "./RestaurantNotFound";
import getfilterRestaurant from "@/libs/getfilterRestaurant";

export default async function RestaurantCatalog({
    filter
}: {
    filter : string[]
}) {
    
    const RestaurantReady = await getfilterRestaurant(filter);
    // const RestaurantReady: RestaurantJson = await RestaurantsJson;


    return (
        <div className="flex items-start justify-center">
            {
                RestaurantReady.count > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-black">
                        {
                            RestaurantReady.data.map((restaurantItem: RestaurantItem) =>
                                // <Link href={`/restaurant/${restaurantItem.id}`} className="mb-9" key={restaurantItem._id}>
                                <Card key={restaurantItem._id} restaurantItem={restaurantItem} />
                                // </Link>
                            )
                        }
                    </div>
                    :
                    <RestaurantNotFound />
            }
        </div>
    );
}
