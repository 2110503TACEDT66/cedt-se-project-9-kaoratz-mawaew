'use client'

import styles from '@/components/card.module.css'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import { RestaurantItem } from '../../interface'

export default function Card({ restaurantItem }: { restaurantItem: RestaurantItem }) {
    const [openHour, openMinute] = restaurantItem.opentime.split(':').map(Number);
    const [closeHour, closeMinute] = restaurantItem.closetime.split(':').map(Number);

    // Create openTime and closeTime using dayjs
    const openTime = dayjs().set('hour', openHour).set('minute', openMinute);
    const closeTime = dayjs().set('hour', closeHour).set('minute', closeMinute);

    // Get current time using dayjs
    const currentTime = dayjs();

    // Compare current time with openTime and closeTime
    const flag = currentTime >= openTime && currentTime <= closeTime;

    return (
        <InteractiveCard>
            <div data-testid="card" className='flex flex-col'>
                <div className="w-[298px] h-[496px]">
                    <div className="p-2">
                        {
                            <Image src={restaurantItem.imageUrl}
                                alt='Hospital Picture'
                                width={284} // Set the width of the image
                                height={181} // Set the height of the image
                                className='bg-cover w-[284px] h-[181px]'
                            />
                        }
                    </div>
                    <div className="p-2 flex flex-col">
                        <p className='text-2xl text-left mb-4'>
                            {restaurantItem.name}
                        </p>
                        <div className="flex-row flex justify-between items-center mb-4">
                            {
                                flag ?
                                    <p className='text-xs text-green-700 font-bold'>
                                        OPENED
                                    </p>
                                    :
                                    <p className='text-xs text-red-800 font-bold'>
                                        CLOSED
                                    </p>
                            }

                            <p className='text-xs'>
                                {restaurantItem.opentime} - {restaurantItem.closetime}
                            </p>
                        </div>
                        <p className='text-base text-left mb-4'>
                            Address
                        </p>
                        <p className='text-xs text-left pb-4'>
                            {restaurantItem.address}, {restaurantItem.district}, {restaurantItem.province}, {restaurantItem.postalcode}
                        </p>
                    </div>
                    <div className='flex flex-row m-2'>
                        <Link data-testid="details" href={`/restaurant/${restaurantItem.id}`}>
                            <button className='w-[141px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1' onClick={(e) => { e.stopPropagation; }}>
                                Details
                            </button>
                        </Link>
                        <Link data-testid="reserve" href={`/reserve?id=${restaurantItem.id}&name=${restaurantItem.name}`}>
                            <button className='w-[141px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1' onClick={(e) => { e.stopPropagation; }}>
                                Reserve
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </InteractiveCard>
    );
}
