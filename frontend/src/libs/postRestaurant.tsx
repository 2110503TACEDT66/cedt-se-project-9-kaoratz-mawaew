
export default async function postRestaurant(
    formData: FormData,
    token: string
 ) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(Object.fromEntries(formData))
    })

    if (!response) {
        throw new Error("Failed to post restaurant")
    }
    return await response.json()
}