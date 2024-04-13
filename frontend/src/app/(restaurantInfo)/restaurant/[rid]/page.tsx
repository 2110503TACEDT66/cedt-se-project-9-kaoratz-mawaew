import Image from 'next/image';
import getRestaurant from '@/libs/getRestaurant';
import Link from 'next/link';
// import ReviewCard from '@/components/ReviewCard';

import Map from '@/components/ridpage/Map';

import RestaurantTime from '@/components/ridpage/RestaurantTime';
import Address from '@/components/ridpage/Address';
import Tag from '@/components/ridpage/Tag';
import AllReviewCard from '@/components/ridpage/AllReviewCard';
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
        <div className="w-[83%] pl-4 font-mono">

            <div className='flex justify-start'>
                <h1 className="text-4xl font-bold mb-12">{restaurantDetails.data.name}</h1>
                <hr className='border-black border-1 w-full m-5'/>
            </div>
            
            <div className="flex flex-row mb-4">
                
                <div className="w-[37%]">
                    <RestaurantTime restaurantDetails={restaurantDetails.data} flag={flag}/>

                    <Address restaurantDetails={restaurantDetails.data}/>

                    {/*<AllReviewCard reviewJson={reviews}/>*/}
                </div>
                
                <div className="w-[63%] h-[100%] flex flex-col items-center">
                    <img src={restaurantDetails.data.imageUrl} alt="" className="w-full ml-9 h-[50%]" />
                </div>

            </div>
            
            <Tag restaurantDetails={restaurantDetails.data}/>

            <div className="flex flex-row mt-4">
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