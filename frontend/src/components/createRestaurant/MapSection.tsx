'use client';
import MapScreen from "./MapScreen";
import MapSearchSection from "./MapSearchSection";
import { useEffect, useState } from "react";

export default function MapSection({
    setLocation
}:{
    setLocation: Function
}){


    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {

        setLocation(selectedLocation);

    }, [selectedLocation]);



    return (
        <div className="w-full h-full flex flex-row gap-4">
            <MapScreen selectedLocation={selectedLocation}/>
            <MapSearchSection 
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
        </div>
    );
}