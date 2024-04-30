"use client";

import { useState } from "react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";

export default function CardPanel() {
  const [RestaurantResponse, setRestaurantResponse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await getRestaurants();
      setRestaurantResponse(restaurants);
    };
    fetchData();
  }, []);

  if (!RestaurantResponse) return <p>Restaurant Panel is Loading...</p>;
}
