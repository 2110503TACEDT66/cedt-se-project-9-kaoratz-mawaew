import ReviewCard from "./ReviewCard";

export default function AllReviewCard() {
    return (
        <div id="all-review-card" className="m-5 flex flex-row overflow-x-scroll">
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
        </div>
    )
}