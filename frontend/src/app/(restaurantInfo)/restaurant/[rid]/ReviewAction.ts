'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/components/auth"
import postReview from "@/libs/postReview";

export default async function makeReview(comment: string, rid: string, rating: number) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) {
        return null
    }

    if (rid) {
        const response = await postReview(rid, rating, comment, session.user.token)
    }
}