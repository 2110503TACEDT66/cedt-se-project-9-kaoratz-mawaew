'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import postReview from "@/libs/postReview";
const handleCreate = async (
    id : string,
    rating: number,
    comment: string
) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null
    
    const response = await postReview(id, rating, comment, session.user.token);

    revalidateTag('reviews');
    // revalidatePath(`/restaurant/${id}`,'page');
    // redirect(`/restaurant/${id}`)
    
}

export default handleCreate;