import ReviewCard from "./ReviewCard";
import { ReviewItem, ReviewJson } from "../../../interface";

export default async function AllReviewCard({reviewJson}:{reviewJson:Promise<ReviewJson>}) {
    const reviews = await reviewJson;

    return reviews.count != 0 ? (
        <div className="ml-4 mb-24 flex flex-row overflow-x-scroll mt-4" id="all-review-card">
            { 
                
                    [...reviews.data].reverse().map((reviewItems: ReviewItem) => 
                        <ReviewCard ReviewItem={reviewItems}></ReviewCard>
                    )
                    
            }
        </div>
    ):(
        <div className="mt-4 mb-24">
            No comment
        </div>
    )
}