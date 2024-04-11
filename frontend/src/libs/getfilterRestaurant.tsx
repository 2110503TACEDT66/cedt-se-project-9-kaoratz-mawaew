export default async function getfilterRestaurant(tags:string[]) {
    const allTags = tags.join(',').toString();
    // const queryParams = new URLSearchParams({ tags: tags.join(',') }).toString();
    const url = `http://localhost:200/api/v1/restaurants?tag=${allTags}`; // ex: allTags = American,Thai,Italian

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to filter restaurant");
    }

    return await response.json();
}
