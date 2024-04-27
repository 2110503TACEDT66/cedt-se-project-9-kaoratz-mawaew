import { ReservationResponse } from "../../interface";

export default async function getSummaryReservation(rid: string, token: string) {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/reservations/${rid}/summary`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch peak hour data");
    }
    return await response.json();
}
