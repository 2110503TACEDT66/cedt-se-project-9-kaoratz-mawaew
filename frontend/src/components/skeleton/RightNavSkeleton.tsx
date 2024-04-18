export default function RightNavSkeleton() {
    return (
        <>
        <div className="bg-neutral-100 w-[15vw] h-[60vh] flex flex-col gap-4 mr-[1.5    vw]">
            <div className="flex flex-col gap-2">
                <div className="bg-gray-300 h-5 rounded-sm "></div>
                <div className="bg-gray-300 h-2 w-28" ></div>
                <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-sm "></div>
                    <span className="text-zinc-900">Eat Food</span>
                    <div className="bg-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-900">Fast Food</span>
                    <div className="border-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                </div>
                {/* Add more items here */}
            </div>
            <hr className="border-zinc-900 w-52" />
            <div className="flex flex-col gap-2">
                <h2 className="text-zinc-900 font-bold">Category</h2>
                <hr className="border-zinc-900 w-24" />
                <div className="flex items-center gap-2">
                    <span className="text-zinc-900">Fine dining</span>
                    <div className="bg-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-900">Fast food</span>
                    <div className="border-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                </div>
                {/* Add more items here */}
            </div>
            <hr className="border-zinc-900 w-52" />
            <div className="flex flex-col gap-2">
                <h2 className="text-zinc-900 font-bold">Create blog</h2>
                <hr className="border-zinc-900 w-20" />
                <div className="bg-neutral-100 border-zinc-900 w-48 h-48"></div>
            </div>
        </div>
        </>
    )
}