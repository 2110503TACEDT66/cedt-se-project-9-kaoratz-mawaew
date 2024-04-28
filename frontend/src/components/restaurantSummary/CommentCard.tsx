import { Rating } from "@mui/material"
import { ReviewItem } from "../../../interface"

export default function CommentCard({review} : {review:ReviewItem}) {
    return (
        <div className="p-3 border-black border-2 w-full">
            <h1 className="text-xl font-bold">{review.user.name}</h1>
            <Rating className="mt-1" name="stars" value={review.rating} readOnly size="small" style={{color: 'black'}}/>
            <p className="text-[14px] text-primary">{review.comment}</p>
        </div>
    )
}