
export default async function getRestaurant(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}`)

    if(!response){
        throw new Error(`Failed to fetch restaurant with id of ${id}`)
    }
    return await response.json()
}
