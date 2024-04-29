import CommentCard from "./CommentCard"
import { ReviewJson } from "../../../interface"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
export default async function AllCommentCard({ review, role }: { review: ReviewJson, role: string }) {    

    return review.count ?
        (
            <div className="mt-10 gap-4 grid grid-cols-3 max-h-[240px] overflow-y-scroll no-scrollbar">
                {
                    review.data.map((reviewItem) => (
                        <CommentCard key={reviewItem._id} review={reviewItem} />
                    ))
                }
            </div>

        ) :
        (
            <div className="flex justify-center border-black border-2 p-4">
                {
                    role == "user"? <p className="text-3xl">No comment</p> :<p className="text-3xl">No comment on this restaurant</p>
                }
            </div>
        )
}