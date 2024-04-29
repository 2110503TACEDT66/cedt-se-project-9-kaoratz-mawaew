import { RestaurantItem } from "../../../interface";

export default function Map({restaurant} : {restaurant: RestaurantItem}) {

    // const mapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${restaurant.name + `,${restaurant.address}` + `,${restaurant.subdistrict}` + `,${restaurant.district}` + `,${restaurant.province}` + ',Thailand'}`;
    // const response = await fetch(mapUrl);
    // const data = await response.json();  
    let mapLink = '';
    if(restaurant.map){
        const map =  restaurant.map; 
        const lat = map.split('/')[map.split('/').length-2];
        const lon = map.split('/')[map.split('/').length-1];
        console.log(lat, lon);
        mapLink = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;
    }
  
    return (
        <div className="w-full h-full">
            {
                restaurant.map? <iframe id="map" src={mapLink} className="w-full h-full">
            </iframe> : <h1 className="text-lg text-center text-rose-600 font-bold">Map Not Found</h1>
            }
            
        </div>
    )
}