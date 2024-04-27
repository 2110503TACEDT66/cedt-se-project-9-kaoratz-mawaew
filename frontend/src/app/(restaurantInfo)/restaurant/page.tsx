// 'use client'; //TODO: im gonna make it a server component

import getRestaurants from '@/libs/getRestaurants';
import RestaurantCatalog from '@/components/RestaurantCatalog';
import { RightSideBar } from '@/components/RightSide';
import { Suspense } from 'react';
import getfilterRestaurant from '@/libs/getfilterRestaurant';
import { RestaurantJson } from '../../../../interface';
import MainPageMiddleSkeleton from '@/components/skeleton/mainPageMiddle';

export default function restaurantsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  // const [tagParams, setTagParams] = useState<string[]>([]);

  // const restaurants: Promise<RestaurantJson> = getRestaurants();

  // const [filteredRestaurants, setFilteredRestaurants] = useState<Promise<RestaurantJson>>(restaurants);

  // useEffect(() => {

  //   setFilteredRestaurants(getfilterRestaurant(tagParams));

  // }, [tagParams]);

  // console.log(searchParams);
  //{ tags: 'Japanese,Italian' }

  const filteredRestaurants = searchParams.tags?.toString().split(',') || [];

  // const restaurants : Promise<RestaurantJson> = getfilterRestaurant(filteredRestaurants);

  // console.log("promise!!!");


  return (
    <main className="flex h-full w-[88%]">
      <div className='w-[83%] h-[88vh] overflow-y-scroll'>
        <p className='text-4xl mb-16 ml-7 text-left font-bold text-black'>Dining Experience</p>
        <Suspense key={searchParams.tags?.toString() || "main"} fallback={
          <MainPageMiddleSkeleton />
        }>
          <RestaurantCatalog filter={filteredRestaurants} />
        </Suspense>
      </div>

      
        
      <RightSideBar />
      
    </main>
  );
}
