export default async function updateUser(
    userName: string,
    userEmail: string,
    userTel: string,
    token: string
  ) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        tel: userTel
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return await response.json();
  }
  