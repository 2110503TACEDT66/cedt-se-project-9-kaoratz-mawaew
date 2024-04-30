import { Rating } from "@mui/material"
import { ReviewItem } from "../../../interface"
import { formatDistanceToNow, parseISO } from 'date-fns';
export default async function ReviewCard({ ReviewItem }: { ReviewItem: ReviewItem }) {
    const formattedDate = new Date(ReviewItem.createdAt).toISOString().slice(0, 10);
    const date = parseISO(ReviewItem.createdAt);
    const formatDateBackward = formatDistanceToNow(date, { addSuffix: true });

    return (
        <>
            <div className="w-2/5 h-[15%] m-4 shadow-[-1px_1px_3px_rgba(0,0,0,0.3)] flex-none font-mono mb-10">
                <div className="shadow-[4px_6px_6px_rgba(0,0,0,0.3)]">
                    <div className="border-[2px] border-[#000] p-5 ">

                        <h1 className="text-base font-bold text-[20px]">{ReviewItem.user.name} </h1>
                        <div className="flex flex-row gap-2">
                            <Rating name="stars" value={ReviewItem.rating} readOnly size="small" style={{ color: 'black' }} />
                            <p className="text-[14px] text-primary">{formatDateBackward}</p>
                        </div>

                        <div className="flex flex-row items-center gap-1 pl-1">
                            <p className="text-[20px]">  ·  </p>
                            <p className="text-[14px] text-primary">{formattedDate}</p>
                        </div>
                        <p className="text-[14px] text-primary pt-2">{ReviewItem.comment}</p> 
                    </div>
                </div>
            </div>
        </>
    )
}
            