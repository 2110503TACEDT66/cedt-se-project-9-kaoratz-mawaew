import getRestaurants from '@/libs/getRestaurants';
import RestaurantCatalog from '@/components/RestaurantCatalog';
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';

export default function restaurantsPage() {
  console.log('get all restaurants');
  const restaurants = getRestaurants()
  return (
    <main className='w-[83%] text-center pr-0 mr-0'>
      <Suspense fallback={
        <p>Loading Restaurant...<LinearProgress /></p>
      }>
      <p className='text-4xl mb-16 ml-7 text-left font-bold'>Dining Experience</p>
        <RestaurantCatalog RestaurantsJson={restaurants} />
      </Suspense>
    </main>
  );
}
