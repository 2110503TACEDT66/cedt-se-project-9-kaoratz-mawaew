import getReviews from "@/libs/getReviews";
import ReviewCard from "./ReviewCard";
import { ReviewItem, ReviewJson } from "../../../interface";

export default async function AllReviewCard({reviewJson}:{reviewJson:Promise<ReviewJson>}) {
    const reviews = await reviewJson;
    return (
        <div className="m-5 flex flex-row overflow-x-scroll" id="all-review-card">
            { 
                reviews.data?
                    reviews.data.map((reviewItems: ReviewItem) => 
                        <ReviewCard ReviewItem={reviewItems}></ReviewCard>
                    ): 
                    null
            }
        </div>
    )
}