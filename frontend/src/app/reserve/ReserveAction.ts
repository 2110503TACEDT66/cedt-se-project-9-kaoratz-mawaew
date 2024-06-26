'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import { revalidatePath } from "next/cache";
import postReservation from "@/libs/postReservation";
import dayjs from "dayjs";


export default async function makeBooking (
    rid : string,
    bookDate : Date | null,
    
) {
    
    const session = await getServerSession(authOptions);
    

    if(!session || !session.user.token) return null
    
    if (rid && session) {
        const response = await postReservation(rid, 
            dayjs(bookDate).format("YYYY-MM-DD") + "T" + dayjs(bookDate).format("HH:mm:ss"), 
            session.user.token)
        
        
        revalidatePath('/myTable');

        return await response;
        
    }
    

}