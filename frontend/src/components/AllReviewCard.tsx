import getReviews from "@/libs/getReviews";
import ReviewCard from "./ReviewCard";
import { ReviewItem, ReviewJson } from "../../interface";

export default async function AllReviewCard({reviewJson}:{reviewJson:Promise<ReviewJson>}) {
    const reviews = await reviewJson;
    return (
        <>
        <div className="flex flex-row content-center place-content-around flex-wrap">
            { 
            reviews.data?
            reviews.data.map((reviewItems: ReviewItem) => 
            <div className="m-5 flex flex-row overflow-x-scroll">
            <ReviewCard ReviewItem={reviewItems}></ReviewCard>
            </div>
            ) : null
            }
        </div>
    </>

    )
}