'use client';
import MapScreen from "./MapScreen";
import MapSearchSection from "./MapSearchSection";
import { useState } from "react";

export default function MapSection(){


    const [selectedLocation, setSelectedLocation] = useState(null);



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