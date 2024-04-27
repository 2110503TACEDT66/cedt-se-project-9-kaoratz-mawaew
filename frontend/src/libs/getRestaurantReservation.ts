export default async function getRestaurantReservation(token: string) {
  

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/reservations/restaurantinfo`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  }