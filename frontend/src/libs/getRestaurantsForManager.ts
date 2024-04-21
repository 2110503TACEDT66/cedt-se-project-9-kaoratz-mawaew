export default async function getRestaurantsForManager(mid: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants?manager=${mid}`);
  
    if (!response) {
      throw new Error("Failed to fetch restaurants");
    }
    return await response.json();
  }
  