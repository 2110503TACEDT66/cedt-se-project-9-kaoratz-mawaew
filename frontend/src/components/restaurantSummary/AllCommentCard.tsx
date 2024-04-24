import CommentCard from "./CommentCard"

export default function AllCommentCard() {
    return (
        <div className="mt-10 gap-4 grid grid-cols-3 h-[28%] overflow-y-scroll">
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
        </div>
    )
}