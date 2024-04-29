'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { managerform } from "../../../interface";
export async function RegisterAction(
    formData:managerform
){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:formData.name,
            tel:formData.tel,
            email:formData.email,
            password:formData.password,
            role:'manager',
        })
    })
    if (!response.ok) {
        throw new Error("Failed to post manager")
    }
    revalidatePath("/dashboard") 
    redirect("/dashboard")
}