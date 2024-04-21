import { ReservationResponse } from "../../interface";

export default async function getSummaryReservation(rid: string): Promise<ReservationResponse> {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/reservations/summary/${rid}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch peak hour data");
    }
    return await response.json();
}
