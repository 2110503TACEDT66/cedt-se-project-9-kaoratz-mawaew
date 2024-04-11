import getReviews from "@/libs/getReviews";
import ReviewCard from "./ReviewCard";

export default function AllReviewCard() {
    const reviews = getReviews();
    return (
        <div className="m-5 flex flex-row overflow-x-scroll">
            <ReviewCard ReviewJson={reviews}></ReviewCard>
        </div>
    )
}