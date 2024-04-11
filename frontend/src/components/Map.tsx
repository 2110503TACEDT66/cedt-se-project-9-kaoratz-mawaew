import { RestaurantItem, RestaurantJson } from "../../interface";
import Link from "next/link";

export default async function Map({restaurant} : {restaurant: RestaurantItem}) {

    const mapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${restaurant.name + `,${restaurant.address}` + `,${restaurant.subdistrict}` + `,${restaurant.district}` + `,${restaurant.province}` + ',Thailand'}`;
    const response = await fetch(mapUrl);
    const data = await response.json();
    const {lat, lon} = data[0];
    const mapLink = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;

    return (
        <div className="w-full p-4 h-[50%]">
            <iframe src={mapLink} className="w-full h-full">
            </iframe>
        </div>
    )
}