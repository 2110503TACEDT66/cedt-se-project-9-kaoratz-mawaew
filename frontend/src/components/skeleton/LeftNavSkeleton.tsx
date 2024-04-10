import { Skeleton } from "@mui/material";


export default function LeftNavSkeleton() {
    return (
        <div className="w-[12%] ml-9 border-r-2 border-r-gray-200 pr-5 h-[70vh] flex flex-col gap-[10%]">
            <div className="h-[12%] max-w-[360px] bg-gray-300 rounded-md "></div>
            <div className="h-[12%] max-w-[360px] bg-gray-300 rounded-md"></div>
            <div className="h-[12%] max-w-[360px] bg-gray-300 rounded-md"></div>
            <div className="h-[12%] max-w-[360px] bg-gray-300 rounded-md"></div>
        </div>
    )
}