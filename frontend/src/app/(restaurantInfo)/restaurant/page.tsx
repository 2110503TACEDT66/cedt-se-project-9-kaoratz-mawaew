'use client';

import getRestaurants from '@/libs/getRestaurants';
import RestaurantCatalog from '@/components/RestaurantCatalog';
import { RightSideBar } from '@/components/RightSide';
import { Suspense, useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import getfilterRestaurant from '@/libs/getfilterRestaurant';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RestaurantJson } from '../../../../interface';
import MainPageMiddleSkeleton from '@/components/skeleton/mainPageMiddle';

export default function restaurantsPage() {
  // console.log('get all restaurants');

  const [tagParams, setTagParams] = useState<string[]>([]);
  // const [params, ]
  const restaurants: Promise<RestaurantJson> = getRestaurants();

  const [filteredRestaurants, setFilteredRestaurants] = useState<Promise<RestaurantJson>>(restaurants);

  useEffect(() => {

    setFilteredRestaurants(getfilterRestaurant(tagParams));

  }
    , [tagParams]);

  return (
    <main className="flex w-[88%]">
      <div className='w-[83%] h-full'>
        <p className='text-4xl mb-16 ml-7 text-left font-bold text-black'>Dining Experience</p>
        <Suspense fallback={
          <MainPageMiddleSkeleton />
        }>
          <RestaurantCatalog RestaurantsJson={filteredRestaurants} />
        </Suspense>
      </div>

      <RightSideBar setTagParams={setTagParams} />
    </main>
  );
}
