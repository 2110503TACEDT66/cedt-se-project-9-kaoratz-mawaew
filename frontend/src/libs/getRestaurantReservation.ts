export default async function getRestaurantReservation() {
  

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/reservations/restaurantinfo`,
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  }