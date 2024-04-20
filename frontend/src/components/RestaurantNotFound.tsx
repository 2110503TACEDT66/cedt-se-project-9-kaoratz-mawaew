import Image from "next/legacy/image"

export default function RestaurantNotFound() {

    return (
        <div className="flex flex-col items-center gap-[10%] text-black h-full w-full">
            <div className="w-[35vw] h-[35vh] relative">
                <Image src="/notFoundIcon.svg" alt="icon" width={0} height={0} objectFit="contain" layout="fill" />
            </div>
            <div className="text-center font-semibold font-mono text-xl">
                <div>Not Found</div>
                <div>The restaurant corresponding to the selected tag was not found.</div>
            </div>
        </div>
    )
}
