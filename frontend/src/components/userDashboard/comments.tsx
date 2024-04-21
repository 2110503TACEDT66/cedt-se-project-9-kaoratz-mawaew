import getUserReviews from "@/libs/getUserReviews";
import { ReviewItem, ReviewJson } from "../../../interface";
import ReviewCard from "../ridpage/ReviewCard";

export default async function comments({reviewsJson} : {reviewsJson : ReviewJson}){
    const comments = await reviewsJson
    return(
        <>
        {
            comments.count > 0 ?
            (
                [...comments.data].reverse().map((commentItems : ReviewItem)=>
                <ReviewCard ReviewItem={commentItems}></ReviewCard>
                )
            ) : null
        }
        </>
    );
}