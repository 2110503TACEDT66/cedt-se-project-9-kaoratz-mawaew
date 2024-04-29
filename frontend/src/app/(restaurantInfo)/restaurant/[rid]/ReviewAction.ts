'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";
import { revalidateTag } from "next/cache";
import postReview from "@/libs/postReview";
const handleCreate = async (
    id : string,
    rating: number,
    comment: string
) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null
    
    await postReview(id, rating, comment, session.user.token);

    revalidateTag('reviews');
}

export default handleCreate;