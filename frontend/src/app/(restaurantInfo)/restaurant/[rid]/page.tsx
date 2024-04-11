import Image from 'next/image';
import getRestaurant from '@/libs/getRestaurant';
import Link from 'next/link';

import Map from '@/components/Map';

import AllReviewCard from '@/components/AllReviewCard';
import getReviews from '@/libs/getReviews';


export default async function GetOne({ params }: { params: { rid: string } }) {
    const restaurantDetails = await getRestaurant(params.rid);
    const reviews = getReviews(params.rid);

    const currentTime = new Date(); // Get current time
    const openTime = new Date();
    const closeTime = new Date();

    // Set hours and minutes for openTime and closeTime based on restaurantDetails.data
    const [openHour, openMinute] = restaurantDetails.data.opentime.split(':').map(Number);
    const [closeHour, closeMinute] = restaurantDetails.data.closetime.split(':').map(Number);
    openTime.setHours(openHour, openMinute, 0, 0);
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    // Compare current time with open and close times
    const flag = currentTime >= openTime && currentTime <= closeTime;

    const mapHref = restaurantDetails.data.map ? restaurantDetails.data.map : '/';

    return (
        <div className="w-[83%] pl-4">
            <div className="flex flex-row mb-4">
                <div className="w-[50%]">
                    <h1 className="text-4xl	font-bold mb-16">{restaurantDetails.data.name}</h1>
                    <p className="text-2xl mb-4	">Time</p>
                    <p className="text-4xl mb-4 inline-block border border-stone-800 py-2 px-4">{restaurantDetails.data.opentime}</p>
                    <p className="text-4xl mb-4 inline-block p-2">-</p>
                    <p className="text-4xl mb-4 inline-block border border-stone-800 py-2 px-4">{restaurantDetails.data.closetime}</p>
                    <div className="flex flex-row ">
                        <div>
                            <p className="text-2xl mb-4	">Date</p>
                            <p className="text-4xl mb-4 mr-4 inline-block border border-stone-800 py-2 px-4">Mon-Fri</p>
                        </div>
                        <div>
                            <p className="text-2xl mb-4	">Status</p>
                            {
                                flag ? <p className="text-4xl text-green-600 font-bold mb-4 inline-block border border-stone-800 p-2">OPENED</p> :
                                    <p className="text-4xl text-red-800 font-bold mb-4 inline-block border border-stone-800 p-2">CLOSED</p>
                            }

                        </div>
                    </div>
                    <div>
                        <p className="text-2xl mb-4	">Address</p>
                        <div
                            className="block border p-2 text-center
                            border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                            bg-stone-100 text-stone-800 transform">
                                {/* hover:shadow-lg hover:shadow-stone-500/100 hover:-translate-x-1 hover:-translate-y-1 */}
                            <div className="text-md mx-5 text-left">{restaurantDetails.data.name}
                                <div>Address: {restaurantDetails.data.address}</div>
                                <div>Subdistrict: {restaurantDetails.data.subdistrict}</div>
                                <div>District {restaurantDetails.data.district}</div>
                                <div>Province: {restaurantDetails.data.province}</div>
                                <div>Postal Code: {restaurantDetails.data.postalcode}</div>
                                <div>Tel: {restaurantDetails.data.tel}</div>
                            </div>
                        </div>
                    </div>
                    <AllReviewCard reviewJson={reviews}/>
                </div>
                <div className="w-[50%] flex flex-col items-center">
                    <img src={restaurantDetails.data.imageUrl} alt="" className="w-full p-4 h-[50%]" />
                    <Map restaurant={restaurantDetails.data}/>
                    <Link href={restaurantDetails.data.map} className="text-center text-xs">
                        <button className='bg-slate-300 rounded shadow-md px-2 py-1 hover:bg-slate-600 hover:text-white'>
                            View full map
                        </button>
                    </Link>
                </div>

            </div>
            <div className="flex flex-row">
                <Link href="/restaurant" className='w-[20%] mr-4 inline-block'>
                    <button className="text-base w-[100%] mb-4 mr-4 inline-block border p-2 text-center
                    border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                    hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                    hover:-translate-x-1 hover:-translate-y-1"
                    >
                        Back
                    </button>
                </Link>

                <Link href={`/reserve?id=${params.rid}&name=${restaurantDetails.data.name}`}
                className="w-[80%]">
                <button className="text-base w-[100%] mb-4 inline-block border p-2 text-center border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Go Reserve</button>
                </Link>
                
            </div>
        </div>
    );
}