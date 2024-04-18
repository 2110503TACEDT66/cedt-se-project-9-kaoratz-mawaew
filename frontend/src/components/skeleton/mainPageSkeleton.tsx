import LeftNavSkeleton from "./LeftNavSkeleton";
import MainHeroSkeleton from "./mainHeroSkeleton";
export default function MainPageSkeleton() {
    return (
            <div className="flex flex-row w-[100vw] animate-pulse">
                <LeftNavSkeleton />
                <MainHeroSkeleton />
            </div>
    );
}
