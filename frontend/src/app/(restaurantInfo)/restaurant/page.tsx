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
    <main className="flex w-[88%] mr-0 pr-0">
      <div className='w-[83%] text-center pr-0 mr-0'>
          <p className='text-4xl mb-16 ml-7 text-left font-bold text-black'>Dining Experience</p>
        <Suspense fallback={
          <MainPageMiddleSkeleton/> 
        }>
          {
            restaurants?.data?.length > 0 ? (
              <RestaurantCatalog RestaurantsJson={filteredRestaurants} />
            ) : (
              <div className="text-center text-2xl font-bold mt-16">
                <img src="/notFoundIcon" alt="icon" />
                <h1>Not Found</h1>
                <p>The restaurant corresponding to the selected tag was not found.</p>
              </div>
            )
          }
        </Suspense>
      </div>
      
      <RightSideBar setTagParams={setTagParams} />
    </main>
  );
}
