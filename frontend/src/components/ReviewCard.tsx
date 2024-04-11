import { Rating, RatingStar } from "flowbite-react"
import { ReviewJson, ReviewItem } from "../../interface"

export default async function ReviewCard({ReviewJson}:{ReviewJson:Promise<ReviewJson>}) {
    const reviewReady = await ReviewJson;

    return (
        <>
        <div className="w-2/5 m-10 rounded-xl shadow-[-1px_1px_3px_rgba(0,0,0,0.3)] flex-none">
            <div className="bg-[#ededed] rounded-xl shadow-[4px_6px_6px_rgba(0,0,0,0.3)]">
                <div className="border-[7px] border-[#ededed] rounded-xl p-5 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3)]">
                    {
                    reviewReady.data?
                    reviewReady.data.map((reviewItem: ReviewItem)=>
                    <h1 className="font-sans text-xl font-bold">{reviewItem.user} </h1>
                    )

                    }
                </div>
            </div>
        </div>
        </>
    )
}