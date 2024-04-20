'use server'

import getRestaurant from "@/libs/getRestaurant"

export async function haha ({setResData, rid} : {setResData : Function, rid: string}) {
    const data = await getRestaurant(rid);
    return setResData(data);
}