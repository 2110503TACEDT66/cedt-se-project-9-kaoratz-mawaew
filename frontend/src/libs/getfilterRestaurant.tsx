export default async function getfilterRestaurant(filter:string[]) {
    const response = await fetch(`http://localhost:200/api/v1/restaurants/filter`, {

        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
           tags: filter
        }),
    })

if (!response.ok) {
    throw new Error("Failed to filter restaurant")
}
return await response.json()
}
