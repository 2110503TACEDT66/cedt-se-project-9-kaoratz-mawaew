import { Rating, RatingStar } from "flowbite-react"

export default function ReviewCard() {
    return (
        <div className="w-1/3 bg-[#ededed] rounded-xl m-10 shadow-[6px_6px_3px_rgba(0,0,0,0.3)] shadow-inner-[6px_6px_3px_rgba(0,0,0,0.3)]">
            <div className="border-[6px] border-[#ededed] rounded-xl p-5 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3)]">
                <h1 className="font-sans text-xl font-bold">Name Surname</h1>
                <Rating>
                    <RatingStar className="h-6 w-6" />
                    <RatingStar className="h-6 w-6" />
                    <RatingStar className="h-6 w-6" />
                    <RatingStar className="h-6 w-6 text-[#ffffff]" />
                    <RatingStar className="h-6 w-6 text-[#ffffff]" />
                    &nbsp;2 month ago
                </Rating>
                <br/>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum veniam suscipit totam et ratione repellat consectetur, dolor, pariatur doloribus minima provident adipisci, iure dolore. Ullam dolorum amet molestias sit error.<br/>
            </div>
        </div>
    )
}