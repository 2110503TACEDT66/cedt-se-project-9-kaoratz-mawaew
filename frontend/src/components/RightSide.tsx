'use client';

import { useEffect, useState } from 'react';

export function RightSideBar({
    setTagParams
}:{
    setTagParams: Function
}) {
    
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    // fix this & rerender
    const handleCuisineClick = (cuisineType: string) => {
        // Toggle selected cuisine
        if (selectedCuisines.includes(cuisineType)) {
            setSelectedCuisines(selectedCuisines.filter(cuisine => cuisine !== cuisineType));
        } else {
            setSelectedCuisines([...selectedCuisines, cuisineType]);
        }
    };

    const cuisineTypes = [
        'Thai',
        'Japanese',
        'Chinese',
        'Italian',
        'American',
        'Mexican',
        'Indian',
        'Korean',
        'Vietnamese',
        'French'
    ];

    const preLogin = [
        { href: '/', label: 'Home' },
        { href: '/restaurant', label: 'Eatery' },
        { href: '/api/auth/signin', label: 'Login' },
    ];
    const postLogin = [
        { href: '/', label: 'Home' },
        { href: '/reserve', label: 'Reserve' },
        { href: '/myTable', label: 'My Table' },
        { href: '/api/auth/signout', label: "Logout" }
    ];

    // const filter = async (selectedCuisine: string[]) => {
    //     console.log ("Filter: " + selectedCuisine);
    //     try {
    //         const result = await getfilterRestaurant(selectedCuisines);
    //         if (result) {
    //             console.log("Filter: " + result);
    //             return;
    //         } else {
    //             console.log("Filter: No result");
    //         }

    //         console.log("Filter: " + result);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        console.log("Selected Cuisines: " + selectedCuisines);

        setTagParams(selectedCuisines);
    }
    , [selectedCuisines]);

    return (
        <div className="w-[17%] border-l-2 pl-5 border-l-gray-900">
            <div className='w-[100%]'>
                <div className='inline-flex items-center space-x-4 w-full'>
                    <h2 className="text-base text-zinc-900 font-bold">Category</h2>
                    <hr className="border-zinc-900 grow" />
                </div>
                <button className='mt-5'>
                    {
                        cuisineTypes.map((cuisineType) => (
                            <div
                                key={cuisineType}
                                className={`inline-flex items-center space-x-4 mt-4 w-full`}
                                onClick={(e) => {
                                    handleCuisineClick(cuisineType);
                                    // filter(selectedCuisines);
                                    const circleElement = document.getElementById(`${cuisineType} circle`)!;
                                    if (circleElement) {
                                        const currentFilter = circleElement.style.filter;
                                        const currentScale = circleElement.style.transform;
                                        const currentBg = circleElement.style.backgroundColor;

                                        circleElement.style.filter = currentFilter === "blur(2px)" ? "blur(0px)" : "blur(2px)";
                                        circleElement.style.transform = currentScale === "scale(1.5)" ? "scale(1)" : "scale(1.5)";
                                        circleElement.style.backgroundColor = currentBg === "rgb(27, 27, 27)" ? "#FFFFFF" : "rgb(27, 27, 27)";
                                    }
                                }}

                                onMouseEnter={() => {
                                    const nameElement = document.getElementById(`${cuisineType} name`)!;
                                    const currentScale = nameElement.style.transform;

                                    nameElement.style.fontWeight = "semi-bold";
                                    nameElement.style.transform = currentScale === "scale(1.2)" ? "scale(1)" : "scale(1.2)";
                                }}

                                onMouseLeave={() => {
                                    const nameElement = document.getElementById(`${cuisineType} name`)!;
                                    const currentScale = nameElement.style.transform;

                                    nameElement.style.fontWeight = "normal";
                                    nameElement.style.transform = currentScale === "scale(1.2)" ? "scale(1)" : "scale(1.2)";
                                }}
                            >
                                <span id={`${cuisineType} name`} className="text-zinc-900 duration-300 ease-in-out">{cuisineType}</span>
                                <hr className="border-zinc-900 grow" />
                                <div id={`${cuisineType} circle`} className="border-2 border-black w-2.5 h-2.5 rounded-full transition duration-300 ease-in-out"></div>
                            </div>
                        ))
                    }
                </button>
            </div>
            <hr className="border-zinc-900 w-full mt-9" />
        </div>
    );
}