'use server';

import deleteReservation from "@/libs/deleteReservation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postReservation from "@/libs/postReservation";
import postPayment from "@/libs/postPayment";
import dayjs from "dayjs";


export default async function makeBooking (
    rid : string,
    bookDate : Date | null,
    numberValue : number,
    payM : string
) {
    
    const session = await getServerSession(authOptions);
    

    if(!session || !session.user.token) return null
    // console.log(dayjs(bookDate).format("YYYY-MM-DD") + "T" + dayjs(bookDate).format("HH:mm:ss")) //    "resvDate": "2024-12-24T22:50:00.000Z"
    if (rid && session) {
        const response = await postReservation(rid, dayjs(bookDate).format("YYYY-MM-DD") + "T" + dayjs(bookDate).format("HH:mm:ss"), session.user.token)
        const reser = response.data._id
        const pay = await postPayment(session.user.token,numberValue,payM,reser)
    }

    revalidatePath('/myTable');
    redirect('/myTable');
}