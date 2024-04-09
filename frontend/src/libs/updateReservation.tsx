export default async function updateReservation(token:string, resid:string, resvTime:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${resid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            resvDate: resvTime,
        }),
    })
    if(!response.ok){
        throw new Error("Failed to fetch reservation")
    }
    return await response.json()
}
