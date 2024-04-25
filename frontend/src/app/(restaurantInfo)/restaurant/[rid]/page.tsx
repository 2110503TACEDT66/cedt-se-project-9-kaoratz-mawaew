import getRestaurant from '@/libs/getRestaurant';
import Link from 'next/link';

import RestaurantTime from '@/components/ridpage/RestaurantTime';
import Address from '@/components/ridpage/Address';
import Tag from '@/components/ridpage/Tag';
import AllReviewCard from '@/components/ridpage/AllReviewCard';
import getReviews from '@/libs/getReviews';
import ReviewSection from './ReviewSection';
import { Suspense } from 'react';
import Image from "next/legacy/image";
import PeakHourChart from '@/components/dashboard/Chart';
import getSummaryReservation from '@/libs/getSummaryReservation';

export default async function GetOne({ params }: { params: { rid: string } }) {
    const restaurantDetails = await getRestaurant(params.rid);
    const restaurantSummaryReservations = await getSummaryReservation(params.rid);
    const reviews = getReviews(params.rid);

    const currentTime = new Date(); // Get current time
    const openTime = new Date();
    const closeTime = new Date();

    // Set hours and minutes for openTime and closeTime based on restaurantDetails.data
    const [openHour, openMinute] = restaurantDetails.data.opentime.split(':').map(Number);
    const [closeHour, closeMinute] = restaurantDetails.data.closetime.split(':').map(Number);
    openTime.setHours(openHour, openMinute, 0, 0);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    // console.log(restaurantSummaryReservations.data.hourlyForecasts);

    // Compare current time with open and close times
    const flag = currentTime >= openTime && currentTime <= closeTime;
    return (
        <div className="w-[88%] h-full pl-9 font-mono flex flex-col gap-10">

            <div className='flex flex-row justify-center items-center gap-5'>
                <h1 className="text-4xl font-bold text-primary text-nowrap">{restaurantDetails.data.name}</h1>
                <hr className='border-black border-1 flex-grow ' />
            </div>

            <div className="flex flex-row text-primary h-[70vh] w-full gap-[2%]">

                <div className="w-[42%] h-full flex flex-col ">
                    <RestaurantTime restaurantDetails={restaurantDetails.data} flag={flag} />
                    <Address restaurantDetails={restaurantDetails.data} />
                </div>

                <div className="w-[56%] h-full items-center">
                    <div className='relative w-full h-full'>
                        <Image src={restaurantDetails.data.imageUrl}
                            alt='Restaurant Picture'
                            width={0}
                            height={0}
                            objectFit='cover'
                            layout='fill'
                            style={{ borderRadius: '2px', border: '2px solid black' }}
                        />
                    </div>
                </div>

            </div>

            <div className='flex flex-row justify-center items-center gap-5'>
                <h1 className="text-4xl font-bold text-primary text-nowrap">Chart</h1>
                <hr className='border-black border-1 flex-grow ' />
            </div>
            {
                (restaurantSummaryReservations.data) ? <PeakHourChart data={restaurantSummaryReservations.data.chartdata} forecast={restaurantSummaryReservations.data.hourlyForecasts} /> : <p>No data</p>

            }
            <div className='flex flex-col w-full'>

                <Tag restaurantDetails={restaurantDetails.data} />

                <ReviewSection rid={restaurantDetails.data.id} />
                <Suspense fallback={<>
                    Loading...
                </>}>
                    <AllReviewCard reviewJson={reviews} />
                </Suspense>
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