export default function MyTableSkeleton() {
    const skeletonItems = [1, 2, 3];

    return (
        <div className="flex items-start justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-black animate-pulse ">
                {skeletonItems.map((item) => (
                    <div key={item} className="flex flex-col items-start justify-between gap-[5%] bg-gray-200 w-[300px] h-[300px] p-4">
                        <div className="w-full h-[45%] bg-gray-300 flex justify-center items-center ">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col w-full h-[55%] gap-2 justify-start">
                            <div className="bg-gray-300 w-[85%] h-[6%] ml-[5%] rounded-sm"></div>
                            <div className="bg-gray-300 w-[60%] h-[6%] ml-[5%] rounded-sm"></div>
                            <div className="bg-gray-300 w-[70%] h-[6%] ml-[5%] rounded-sm"></div>
                            <div className="bg-gray-300 w-[90%] h-[6%] ml-[5%] rounded-sm"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}