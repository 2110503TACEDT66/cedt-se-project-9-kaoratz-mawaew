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
        <div className="w-full h-full flex gap-4 flex-col">
            <MapScreen selectedLocation={selectedLocation}/>
            <MapSearchSection 
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
        </div>
    );
}