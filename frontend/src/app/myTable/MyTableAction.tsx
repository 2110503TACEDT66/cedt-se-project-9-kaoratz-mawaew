'use server';
import deleteReservation from "@/libs/deleteReservation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const handleDelete = async (
    id : string
) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null
    
    const response = await deleteReservation(session.user.token, id);

    revalidatePath('/myTable');
    redirect('/myTable')
}

export default handleDelete;