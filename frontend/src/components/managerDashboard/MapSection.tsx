'use client';
import dynamic from 'next/dynamic';


// import MapScreen from "./MapScreen";
import MapSearchSection from "./MapSearchSection";
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { RestaurantItem } from '../../../interface';

const MapScreen = dynamic(() => import('@/components/managerDashboard/MapScreen'), { 
    loading: () => <>
        <div className='w-[60%] h-full bg-gray-100 animate-pulse border-gray-600 border-2 rounded-md flex flex-col justify-center items-center'>
            <CircularProgress
            color='inherit'
            />
        </div>
    </>,
    ssr: false,
});

export default function MapSection({
    setLocation,
    restaurant
}:{
    setLocation: Function
    restaurant: RestaurantItem | null
}){


    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {

        setLocation(selectedLocation);

    }, [selectedLocation]);



    return (
        <div className="w-full h-[100%] flex gap-4 flex-row">
            <MapScreen selectedLocation={selectedLocation} restaurant={restaurant}/>
            <MapSearchSection 
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
        </div>
    );
}