export default async function getUserProfile(token: string) {
  console.log(token);
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['profile']
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return await response.json();
}
