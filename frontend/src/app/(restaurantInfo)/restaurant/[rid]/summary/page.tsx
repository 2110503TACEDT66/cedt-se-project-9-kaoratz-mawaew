import { getServerSession } from "next-auth"
import { authOptions } from "@/components/auth"
import getRestaurant from "@/libs/getRestaurant"
import getReservations from "@/libs/getReservations"
import getRestaurantReservation from "@/libs/getRestaurantReservation"
import Statistic from "@/components/managerDashboard/Statistic"
import Tag from "@/components/ridpage/Tag"
import Map from "@/components/ridpage/Map"
import RestaurantHistory from "@/components/restaurantSummary/RestaurantHistory"
import RestaurantStatistics from "@/components/restaurantSummary/RestaurantStatistic"
import AllCommentCard from "@/components/restaurantSummary/AllCommentCard"
import getSummaryReservation from "@/libs/getSummaryReservation"
import PeakHourChart from "@/components/dashboard/ChartFetch"
import getReviews from "@/libs/getReviews"

export default async function SummaryPage({params}: {params: {rid: string}}) {
    
    const session = await getServerSession(authOptions)
    
    const restaurant = await getRestaurant(params.rid)

    const review = await getReviews(params.rid);

    const restaurantSummaryReservations = await getSummaryReservation(params.rid);

    let reservation

    if (session) {
        reservation = await getRestaurantReservation();
    }

    return (
        <div className="w-full ml-4 border-black border-2 p-9 font-mono">
            <div className="items-center inline-flex">
                <h1 className="text-5xl">{restaurant.data.name}</h1>
                <div className="border-black border-2 px-4 py-2 ml-6">4.8</div>
            </div>

            <div className="w-full inline-flex items-center mt-7">
                <h1 className="text-xl text-left font-medium">Summary</h1>
                <hr className="border-zinc-900 grow ml-7"/>
            </div>

            <div className="mt-12">
                <RestaurantStatistics reservation={reservation} rid={params.rid}/>
            </div>

            <table className="w-full mt-[53px]">
                <tbody>
                    <tr>
                        <td className="w-[40%]">
                            <div className="">
                                <p className="text-2xl">Operation hour</p>
                                <div className="items-center inline-flex mt-6">
                                    <div className="border-black border-2 px-12 py-2">
                                        {restaurant.data.opentime}
                                    </div>
                                    <p className="mx-4">-</p>
                                    <div className="border-black border-2 px-12 py-2">
                                        {restaurant.data.closetime}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-9">
                                <Tag restaurantDetails={restaurant.data}/>
                            </div>
                        </td>
                        <td className="w-[60%]">
                            <div className="w-[88%] h-full flex flex-col ml-20">

                                <div className="w-full relative h-[175px] mb-4 border-2 border-black">
                                    <Map restaurant={restaurant.data}/>
                                </div>
                                <div className="p-4 bg-gray-200 h-max border-2 border-black">
                                    <p>Address: {restaurant.data.address}</p>
                                    <p>Subdistrict: {restaurant.data.subdistrict}</p>
                                    <p>District {restaurant.data.district}</p>
                                    <p>Province: {restaurant.data.province}</p>
                                    <p>Postal Code: {restaurant.data.postalcode}</p>
                                    <p>Tel: {restaurant.data.tel}</p>
                                </div>

                            </div>
                    </td>
                    </tr>
                </tbody>
            </table>

            <div className="w-full inline-flex items-center mt-16">
                <h1 className="text-xl text-left font-medium">History</h1>
                <hr className="border-zinc-900 grow ml-7"/>
            </div>
            <div className="mt-9">
                <RestaurantHistory reservation={reservation} rid={params.rid}/>
            </div>

            <div className="w-full inline-flex items-center mt-5">
                <h1 className="text-xl text-left font-medium">Peak Hours</h1>
                <hr className="border-zinc-900 grow ml-7"/>
            </div>
            <div>
                {
                    (restaurantSummaryReservations.data) ? <PeakHourChart data={restaurantSummaryReservations.data.chartdata} forecast={restaurantSummaryReservations.data.hourlyForecasts} /> : <p>No data</p>

                }
            </div>

            <div className="w-full inline-flex items-center mt-16">
                <h1 className="text-xl text-left font-medium">Comment</h1>
                <hr className="border-zinc-900 grow ml-7"/>
            </div>
            <div className="mt-9">
                <AllCommentCard review={review}/>
            </div>
        </div>
    )
}