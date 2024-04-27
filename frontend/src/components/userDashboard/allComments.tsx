import getUserReviews from "@/libs/getUserReviews";
import { ReviewItem, ReviewJson } from "../../../interface";
import ReviewCard from "../ridpage/ReviewCard";

export default async function AllComments({
    reviewPromise
}: {
    reviewPromise: Promise<ReviewJson>
}) {
    
    const comments = await reviewPromise;
    // const comments = await reviewsJson
    return (
        <>
            {
                comments.count > 0 ?
                    (
                        [...comments.data].reverse().map((commentItems: ReviewItem) =>
                            <ReviewCard key={commentItems._id} ReviewItem={commentItems}></ReviewCard>
                        )
                    ) : null
            }
        </>
    );
}