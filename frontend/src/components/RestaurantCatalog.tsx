import Link from "next/link";
import Card from "./Card";
import { RestaurantJson, RestaurantItem } from "../../interface";
import RestaurantNotFound from "./RestaurantNotFound";

export default async function RestaurantCatalog({ RestaurantsJson }: { RestaurantsJson: Promise<RestaurantJson> }) {

    const RestaurantReady: RestaurantJson = await RestaurantsJson;


    return (
        <div className="flex items-start justify-center">
            {
                RestaurantReady.count > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-black">
                        {
                            RestaurantReady.data.reverse().map((restaurantItem: RestaurantItem) =>
                                <Link href={`/restaurant/${restaurantItem.id}`} className="mb-9" key={restaurantItem._id}>
                                    <Card restaurantItem={restaurantItem} />
                                </Link>
                            )
                        }
                    </div>
                    :
                    <RestaurantNotFound />
            }
        </div>
    );
}