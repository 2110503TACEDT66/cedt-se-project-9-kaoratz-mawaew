export default async function deleteReview(token: string, revid: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${revid}`, {

        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
    },
    })

if (!response.ok) {
    throw new Error("Failed to fetch user")
}
return await response.json()
}
