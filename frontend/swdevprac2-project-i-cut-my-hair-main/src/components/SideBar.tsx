import Link from 'next/link';
import { authOptions } from '../components/auth';
import { getServerSession } from 'next-auth';
import getRestaurants from '@/libs/getRestaurants';
import { RestaurantItem } from '../../interface';

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
        <div className="width-[15%] ml-9 border-r-2 border-r-gray-200 pr-9">
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

    const restaurant: RestaurantItem = await RestaurantJson;

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
        // <div className="width-[15%] mr-9">
        //     <div className='width-[100%]]'>
        //         {/* <p className='text-base font-bold'>Ranking</p>
        //         <ul>
        //         </ul> */}

        // </div>
        // </div>


        <div className="bg-neutral-100 w-72 h-96 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-zinc-900 font-bold">Ranking</h2>
                <hr className="border-zinc-900 w-28" />
                <div className="flex items-center gap-2">
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





    );
}