export default async function getfilterRestaurant(tags: string[]) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const allTags = tags.join(",").toString();

  const url = `${process.env.BACKEND_URL}/api/v1/restaurants?tag=${allTags}`; // ex: allTags = American,Thai,Italian
  console.log(url);

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
