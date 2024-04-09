export default async function getRestaurants() {
    await new Promise((resolve)=>setTimeout(resolve,1000))

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`)

    if(!response){
        throw new Error("Failed to fetch restaurants")
    }
    return await response.json()
}
