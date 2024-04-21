'use server';

import updateUser from "@/libs/updateUser";
import { TUserCustomSchema } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function ProfileFormAction(
    userData : TUserCustomSchema,
    token : string
 ) {

    const response = await updateUser(userData.name, userData.email, userData.tel, token);

    
    revalidatePath('profile');
    redirect('/dashboard');
  
}

