export default async function postReservation(rid:string, date:string, token:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${rid}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            resvDate: date,
        }),
    })

    if(!response.ok){
        throw new Error("Failed to fetch user")
    }
    return await response.json()
}
