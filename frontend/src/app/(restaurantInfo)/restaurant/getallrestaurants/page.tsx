import Image from "next/image"
import getRestaurant from "@/libs/getRestaurant"
import Card from "@/components/Card";
import Link from "next/link";

export default async function RestaurantDetailPage({ params }: { params: { rid: string } }) {

    const restaurantDetails = await getRestaurant(params.rid)
    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{restaurantDetails.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={""}
                    alt="Restaurant Picture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] bg-black" />
                    <div className="text-md mx-5 text-left">{restaurantDetails.data.name}
                        <div>Address: {restaurantDetails.data.address}</div>
                        <div>Province: {restaurantDetails.data.province}</div>
                        <div>District {restaurantDetails.data.district}</div>
                        <div>Zipcode: {restaurantDetails.data.postalcode}</div>
                        <div>Tel: {restaurantDetails.data.tel}</div>
                    </div>
                { }
                <Link href={`/reserve/?id=${params.rid}&name=${restaurantDetails.data.name}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo px-3 py-1 text-white shadow-sm">
                        Create Reservation
                    </button>
                </Link>
            </div>
        </main>
    );
}