import getReviews from "@/libs/getReviews";
import ReviewCard from "./ReviewCard";
import { ReviewItem, ReviewJson } from "../../../interface";

export default async function AllReviewCard({reviewJson}:{reviewJson:Promise<ReviewJson>}) {

    const reviews = await reviewJson;

    console.log(reviews.data)
    return (
        <div className="mt-7 ml-4 mb-24 flex flex-row overflow-x-scroll" id="all-review-card">
            { 
                
                reviews.data?
                    [...reviews.data].reverse().map((reviewItems: ReviewItem) => 
                        <ReviewCard ReviewItem={reviewItems}></ReviewCard>
                    ): 
                    null
            }
        </div>
    )
}