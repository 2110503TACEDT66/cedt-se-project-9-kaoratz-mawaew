import { ReservationResponse } from "../../interface";


export default async function getSummaryReservation(rid: string): Promise<ReservationResponse> {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/reservations/${rid}/summary`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        console.log(await response.json());

    }
    return await response.json();
}
