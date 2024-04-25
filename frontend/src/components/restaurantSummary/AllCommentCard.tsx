import CommentCard from "./CommentCard"
import { ReviewJson } from "../../../interface"
export default function AllCommentCard({review}:{review:ReviewJson}) {
    return review.count? 
        (
            <div className="mt-10 gap-4 grid grid-cols-3 max-h-[240px] overflow-y-scroll no-scrollbar">
                {
                    review.data.map((reviewItem) => (
                        <CommentCard key={reviewItem._id} review={reviewItem}/>
                    ))
                }
            </div>
            
        ):
        (
            <div className="flex justify-center border-black border-2 p-4">
                <p className="text-3xl">No comment on this restaurant</p>
            </div>
        )
    }