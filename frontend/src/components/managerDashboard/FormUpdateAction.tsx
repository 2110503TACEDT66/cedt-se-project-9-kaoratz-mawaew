'use server';

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { nominatimItem } from "../../../interface";
import { forminput } from "../../../interface";

export async function FormUpdateAction(
    formData: forminput,
    token: string,
    location: nominatimItem | string | null,
    tags : string,
    imageUrl: string,
    rid: string
 ) {

    let mapLink = null;

    if (typeof location === "string") {
        mapLink = location;
    } else {
        const lat = location?.lat;
        const lon = location?.lon;
        mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`
    }
    
    

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${rid}`, {
        method: 'PUT',
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
        throw new Error("Failed to update restaurant")
    }
    revalidateTag("restaurant") 
    // revalidatePath("/restaurant") 
    redirect("/dashboard")
}