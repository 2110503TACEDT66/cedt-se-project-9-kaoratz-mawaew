'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { managerform } from "../../../interface";
export async function RegisterAction(
    formData:managerform
){
    console.log(formData)
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
    // console.log(response)
    if (!response.ok) {
        console.log("no")
        throw new Error("Failed to post manager")
    }else{
        console.log("yes")
    }
    revalidatePath("/dashboard") 
    redirect("/dashboard")
}