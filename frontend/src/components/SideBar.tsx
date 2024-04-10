import Link from 'next/link';
import { authOptions } from '../components/auth';
import { getServerSession } from 'next-auth';
import getRestaurants from '@/libs/getRestaurants';
import { RestaurantItem } from '../../interface';
import { useState } from 'react';

export async function LeftSideBar() {
    const session = await getServerSession(authOptions)
    console.log("side bar have session")

    const preLogin = [
        { href: '/', label: 'Home' },
        { href: '/restaurant', label: 'Eatery' },
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' }, // Added "Register" menu
    ];
    const postLogin = [
        { href: '/', label: 'Home' },
        { href: '/restaurant', label: 'Reserve' },
        { href: '/myTable', label: 'My Table' },
        { href: '/api/auth/signout', label: "Logout" }
    ];

    return (
        <div className="w-[12%] border-r-2 pr-5 border-r-gray-900">
            <ul>
                {
                    session ?
                        postLogin.map(({ href, label }) => (
                            <li key={href} className="text-4xl pb-9 mt-4 mb-4 hover:bg-gray-100 
                            transition duration-200 transform ">
                                <Link href={href}>
                                    <p className='text-stone-800 cursor-pointer hover:font-bold'> {/* Made text bold on hover here */}
                                        {label}
                                    </p>
                                </Link>
                            </li>
                        )) :
                        preLogin.map(({ href, label }) => (
                            <li key={href} className="text-4xl pb-9 mt-4 mb-4 hover:bg-gray-100 
                            transition duration-200 transform ">
                                <Link href={href}>
                                    <p className='text-stone-800 pb-9 cursor-pointer hover:border-b-2 hover:border-stone-800'> {/* Made text bold on hover here */}
                                        {label}
                                    </p>
                                </Link>
                            </li>
                        ))
                }
            </ul>
        </div>
    );

}


export async function RightSideBar({ RestaurantJson }: { RestaurantJson: Promise<RestaurantItem> }) {

    const session = await getServerSession(authOptions)
    const [selectedCuisine, setSelectedCuisine] = useState<string>();

    const restaurant: RestaurantItem = await RestaurantJson;

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


    return (
        <div className="width-[15%] mr-9">
            <div className='width-[100%]'>
                <div className='inline-flex items-center space-x-4 w-full'>
                    <h2 className="text-zinc-900 font-bold">Category</h2>
                    <hr className="border-zinc-900 w-24" />
                </div>
                <div>
                    {
                        cuisineTypes.map((cuisineType) => (
                            <div
                                key={cuisineType}
                                className={`inline-flex items-center space-x-4 w-full 
                                ${selectedCuisine === cuisineType ? 'rounded-lg blur-md' : ''}`}
                                onClick={() => setSelectedCuisine(cuisineType)}>
                                <span className="text-zinc-900">{cuisineType}</span>
                                <hr className="border-zinc-900 w-24" />
                                <div className="bg-zinc-900 w-2.5 h-2.5 rounded-full"></div>
                            </div>
                        ))
                    }
                </div>

                {/* Add more items here */}
            </div>
            <hr className="border-zinc-900 w-52" />
        </div>





    );
}