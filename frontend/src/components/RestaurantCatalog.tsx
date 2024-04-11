import Link from "next/link";
import Card from "./Card";
import { RestaurantJson, RestaurantItem } from "../../interface";

export default async function RestaurantCatalog({ RestaurantsJson }: { RestaurantsJson: Promise<RestaurantJson> }) {
    const RestaurantReady = await RestaurantsJson;
    
    return (
        <>
            <div className="flex flex-row content-center place-content-start gap-4 ml-9 flex-wrap text-black">
                {
                    RestaurantReady.data ?
                        RestaurantReady.data.map((restaurantItem: RestaurantItem) =>
                            <Link href={`/restaurant/${restaurantItem.id}`} 
                            className="mb-9">
                                <Card restaurantItem={restaurantItem} />
                            </Link>
                        ) : null
                }
            </div>
        </>
    );
}