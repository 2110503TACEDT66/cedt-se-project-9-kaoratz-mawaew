import { RestaurantItem } from "../../../interface";
import React from "react";

export default function Map({restaurant} : {restaurant: RestaurantItem}) {  
    let mapLink = '';
    if(restaurant.map){
        const map =  restaurant.map; 
        const lat = map.split('/')[map.split('/').length-2];
        const lon = map.split('/')[map.split('/').length-1];
        mapLink = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;
    }
  
    return (
        <div className="w-full h-full">
            {
                restaurant.map? <iframe data-TestId="map" id="map" src={mapLink} className="w-full h-full">
            </iframe> : <h1 className="text-lg text-center text-rose-600 font-bold">Map Not Found</h1>
            }
            
        </div>
    )
}