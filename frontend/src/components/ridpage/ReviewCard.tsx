import { Rating } from "@mui/material"
import { ReviewItem } from "../../../interface"

export default async function ReviewCard({ ReviewItem }: { ReviewItem: ReviewItem }) {
    return (
        <>
            <div className="w-2/5 h-[15%] m-4 rounded-xl shadow-[-1px_1px_3px_rgba(0,0,0,0.3)] flex-none font-mono mb-10">
                <div className="bg-[#ededed] rounded-xl shadow-[4px_6px_6px_rgba(0,0,0,0.3)]">
                    <div className="border-[7px] border-[#ededed] rounded-xl p-5 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3)]">

                        <h1 className="text-base font-bold text-[20px]">{ReviewItem.user.name} </h1>
                        <Rating name="stars" value={ReviewItem.rating} readOnly size="small" style={{ color: 'black' }} />
                        <p className="text-[14px] text-primary">{ReviewItem.comment}</p>

                    </div>
                </div>
            </div>
        </>
    )
}