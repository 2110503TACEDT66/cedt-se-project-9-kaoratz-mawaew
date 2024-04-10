'use client';

import Link from 'next/link';
import { authOptions } from '../components/auth';
import { getServerSession } from 'next-auth';
import getRestaurants from '@/libs/getRestaurants';
import { RestaurantItem } from '../../interface';
import { useState } from 'react';
import { config } from 'process';
import { configureStore } from '@reduxjs/toolkit';
import getfilterRestaurant from '@/libs/getfilterRestaurant';

export function RightSideBar() {
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

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

    const filter = async (selectedCuisine: string[]) => {
        try {
            const result = await getfilterRestaurant(selectedCuisines);
            if (result) {
                console.log("Filter: " + result);
                return;
            } else {
                console.log("Filter: No result");
            }

            console.log("Filter: " + result);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-[16%] ml-4 border-l-2 pl-5 border-l-gray-900">
            <div className='w-[100%]'>
                <div className='inline-flex items-center space-x-4 w-full'>
                    <h2 className="text-base text-zinc-900 font-bold">Category</h2>
                    <hr className="border-zinc-900 w-full" />
                </div>
                <div className='mt-9'>
                    {
                        cuisineTypes.map((cuisineType) => (
                            <div
                                key={cuisineType}
                                className={`inline-flex items-center space-x-4 mt-4 w-full 
                                ${selectedCuisines.includes(cuisineType) ? 'rounded-lg blur-md' : ''}`}
                                onClick={() => {
                                    handleCuisineClick(cuisineType);
                                    filter(selectedCuisines);
                                }}
                            >
                                <span className="text-zinc-900">{cuisineType}</span>
                                <hr className="border-zinc-900" />
                                <div className="hover:blur-effect bg-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr className="border-zinc-900 w-full mt-4" />
        </div>
    );
}