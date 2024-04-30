'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { nominatimItem } from "../../../interface";
import { forminput } from "../../../interface";

export async function ActionPostRestaurant(
    formData: forminput,
    token: string,
    location: nominatimItem | null,
    tags : string,
    imageUrl: string
 ) {

    let mapLink = null;

    if (location) {
        const lat = location?.lat;
        const lon = location?.lon;
        mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`
    }

    if (!imageUrl){
        imageUrl = "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
    }
    
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
    } else {
        console.log("Restaurant created successfully")
        console.log(response)
    }
    
    revalidatePath("/restaurant") 
    redirect("/restaurant")
}