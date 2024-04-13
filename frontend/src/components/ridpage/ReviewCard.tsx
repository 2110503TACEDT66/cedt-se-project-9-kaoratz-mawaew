
import { ReviewJson, ReviewItem } from "../../../interface"

export default async function ReviewCard({ReviewItem}:{ReviewItem:ReviewItem}) {
    return (
        <div className="w-2/5 m-10 rounded-xl shadow-[-1px_1px_3px_rgba(0,0,0,0.3)] flex-none">
            <div className="bg-[#ededed] rounded-xl shadow-[4px_6px_6px_rgba(0,0,0,0.3)]">
                <div className="border-[7px] border-[#ededed] rounded-xl p-5 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3)]">

                    <h1 className="font-sans text-xl font-bold">{ReviewItem.name} </h1>
                    <p>{ReviewItem.comment}</p>

                </div>
            </div>
        </div>
    )
}