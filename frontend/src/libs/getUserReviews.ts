export default async function getUserReviews(uid: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/reviews?user=${uid}`,
      {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
      }
    );
  
    if (!response) {
      throw new Error("Failed to fetch restaurants");
    }
    return await response.json();
  }
  