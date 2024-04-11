import getReviews from "@/libs/getReviews";
import ReviewCard from "./ReviewCard";

export default function AllReviewCard({rid}:{rid:string}) {
    const reviews = getReviews(rid);
    return (
        <div className="m-5 flex flex-row overflow-x-scroll">
            <ReviewCard ReviewJson={reviews}></ReviewCard>

        </div>
    )
}