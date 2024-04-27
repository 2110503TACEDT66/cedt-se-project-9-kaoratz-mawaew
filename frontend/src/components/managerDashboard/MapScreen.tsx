'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { RestaurantItem } from "../../../interface";
export default function MapScreen({
    selectedLocation,
    restaurant
}:{
    selectedLocation: any
    restaurant: RestaurantItem | null
}) {

    const icon = L.icon({
        iconUrl: "/RedMapMarker.svg",
        iconSize: [40,40],
    });

    let position: LatLngTuple = [13.7365936, 100.5330593]; // faculty of engineering chulalongkorn university

    if(restaurant?.map){

        const map =  restaurant.map; 
        const lat = map.split('/')[map.split('/').length-2];
        const lon = map.split('/')[map.split('/').length-1];
        position = [parseFloat(lat), parseFloat(lon)];

    }

    
    const locationSelection : LatLngTuple = [selectedLocation?.lat, selectedLocation?.lon];

    const ResetMapCenter = () => {
        const map = useMap();

        useEffect(() => {
            if(selectedLocation === null) return;
            map.setView(
                L.latLng(selectedLocation?.lat, selectedLocation?.lon),
                map.getZoom(),
                { animate: true }
            )
        }, [locationSelection])

        return null;
    }
    


    return (
        <div className="w-[60%] h-full border-gray-600 border-2 rounded-md">
            <MapContainer
                center={selectedLocation?locationSelection:position}
                zoom={15}
                style={{ height: "100%", width: "100%", borderRadius: "5px"}}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedLocation?locationSelection:position} icon={icon}>
                <Popup>
                    {selectedLocation?.display_name}                    
                </Popup>
                </Marker>
                <ResetMapCenter />
            </MapContainer>
        </div>
    );
}
