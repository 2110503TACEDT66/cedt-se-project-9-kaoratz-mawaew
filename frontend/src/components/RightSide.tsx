'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';

export function RightSideBar() {
    
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

    const router = useRouter();
    const path = usePathname();
    const sp = useSearchParams();
    const tagParams = sp.get('tags');
    const tagArray = tagParams?.split(',');

    // tagArray?.forEach((cuisine) => {
    //     if (!cuisineTypes.includes(cuisine)) {
    //         console.log(    "Invalid cuisine type");
    //         return;
    //     }
    // });

    // using search params to store selected cuisines
    const handleCuisineClick = (cuisineType: string) => {
  
        const newParams = new URLSearchParams(sp.toString());
        let selectedTags = "";

        if (tagArray?.includes(cuisineType)) {
            if (tagArray.length === 1) {
                newParams.delete('tags');
                router.push(path + '?' + newParams.toString());
                return;
            }

            (tagArray.filter(cuisine => cuisine !== cuisineType)).forEach((cuisine) => {
                selectedTags += cuisine + ',';
            });
        } else {
            if (cuisineTypes.includes(cuisineType)) selectedTags = tagParams ? tagParams + ',' + cuisineType + ',' : cuisineType + ',';
        }

        selectedTags = selectedTags.slice(0, -1);
        newParams.set('tags', selectedTags);

        router.push(path + '?' + newParams.toString());
    };



    // useEffect(() => {
    //     console.log("Selected Cuisines: " + selectedCuisines);

    //     setTagParams(selectedCuisines);
    // }
    // , [selectedCuisines]);

    const selectedTags = sp.get('tags')?.split(',') || [];

    return (
        <div className="w-[17%] border-l-2 pl-5 border-l-gray-900">
            <div className='w-[100%]'>
                <div className='inline-flex items-center space-x-4 w-full'>
                    <h2 className="text-base text-zinc-900 font-bold">Category</h2>
                    <hr className="border-zinc-900 grow" />
                </div>
                <button className='mt-5'>
                    {
                        cuisineTypes.map((cuisineType) => {
                            const isSelected = selectedTags.includes(cuisineType);

                            return (
                                <div
                                    key={cuisineType}
                                    className={`inline-flex items-center space-x-4 mt-4 w-full`}
                                    onClick={(e) => {
                                        handleCuisineClick(cuisineType);
                                    }}
                                // onMouseEnter={() => {
                                //     const nameElement = document.getElementById(`${cuisineType} name`)!;
                                //     const currentScale = nameElement.style.transform;

                                //     // nameElement.style.fontWeight = "semi-bold";
                                //     nameElement.style.transform = currentScale === "scale(1.1)" ? "scale(1)" : "scale(1.1)";
                                // }}

                                // onMouseLeave={() => {
                                //     const nameElement = document.getElementById(`${cuisineType} name`)!;
                                //     const currentScale = nameElement.style.transform;

                                //     // nameElement.style.fontWeight = "normal";
                                //     nameElement.style.transform = currentScale === "scale(1.1)" ? "scale(1)" : "scale(1.1)";
                                // }}
                                >
                                    <span id={`${cuisineType} name`} className={`text-zinc-900 duration-100 ease-in-out ${isSelected ? 'font-semibold' : ''}`}>{cuisineType}</span>
                                    <hr className="border-zinc-900 grow" />
                                    <div id={`${cuisineType} circle`} className={isSelected ? " bg-[#1b1b1b] border-2 border-black w-2.5 h-2.5 rounded-full transition duration-100 ease-in-out blur-[2px]" : "bg-[#FFFFFF] border-2 border-black w-2.5 h-2.5 rounded-full transition duration-100 ease-in-out "}></div>
                                </div>
                            );
                        })
                    }
                </button>
            </div>
            <hr className="border-zinc-900 w-full mt-9" />
        </div>
    );
}