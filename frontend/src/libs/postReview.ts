export default async function postReview(rid:string, rating:number, comment:string,token:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${rid}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment,
        }),
    })

    if(!response.ok){
        throw new Error("Failed to fetch user\n or Manager cannot leave a review");
    }
    return await response.json()
}
