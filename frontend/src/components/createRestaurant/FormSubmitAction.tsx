'use server';

import { LatLngTuple } from "leaflet";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nominatimItem } from "../../../interface";

export async function ActionPostRestaurant(
    formData: FormData,
    token: string,
    location: nominatimItem,
    tags : string,
    imageUrl: string
 ) {

    const params = Object.fromEntries(formData);

    const lat = location.lat;
    const lon = location.lon;
    
    const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;

    params["map"] = mapLink;
    params["tag"] = tags;
    params["imageUrl"] = imageUrl;
    
    console.log(params);

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(params)
    })

    if (!response) {
        throw new Error("Failed to post restaurant")
    }
    
    revalidatePath("/restaurant") 
    redirect("/restaurant")
}