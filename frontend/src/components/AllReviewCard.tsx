import ReviewCard from "./ReviewCard";

export default function AllReviewCard() {
    return (
        <div className="m-5 flex flex-row overflow-x-scroll">
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
        </div>
    )
}