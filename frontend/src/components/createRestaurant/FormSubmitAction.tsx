'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nominatimItem } from "../../../interface";
import { forminput } from "../../../interface";

export async function ActionPostRestaurant(
    formData: forminput,
    token: string,
    location: nominatimItem,
    tags : string,
    imageUrl: string
 ) {

    const lat = location.lat;
    const lon = location.lon;
    
    const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            ...formData,
            map: mapLink,
            tag: tags,
            imageUrl: imageUrl
        })
    })

    if (!response) {
        throw new Error("Failed to post restaurant")
    }
    
    revalidatePath("/restaurant") 
    redirect("/restaurant")
}