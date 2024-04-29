import RestaurantCatalog from '@/components/RestaurantCatalog';
import { RightSideBar } from '@/components/RightSide';
import { Suspense } from 'react';
import MainPageMiddleSkeleton from '@/components/skeleton/mainPageMiddle';

export default function restaurantsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const filteredRestaurants = searchParams.tags?.toString().split(',') || [];

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
