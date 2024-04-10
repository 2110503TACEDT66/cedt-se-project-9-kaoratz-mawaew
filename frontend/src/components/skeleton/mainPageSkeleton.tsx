import { Skeleton } from "@mui/material";
import LeftNavSkeleton from "./LeftNavSkeleton";
import RightNavSkeleton from "./RightNavSkeleton";
import MainPageMiddleSkeleton from "./mainPageMiddle";
export default function MainPageSkeleton() {
    return (
            <div className="flex flex-row w-[100vw] animate-pulse">
                <LeftNavSkeleton />
                <MainPageMiddleSkeleton />
            </div>
    );
}
