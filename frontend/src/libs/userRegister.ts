export default async function userRegister(
  userName: string,
  userTel: string,
  userEmail: string,
  userPassword: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        tel: userTel,
        email: userEmail,
        password: userPassword,
        role: 'user',
      }),
    }
  );
  console.log(response);

  return await response.json();
}
