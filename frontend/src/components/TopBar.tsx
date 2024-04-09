'use client'

import Marquee from './marquee';

interface NavBarProps {
    userName: string;
}

export default function TopBar({ userName }: NavBarProps) {
    console.log(userName);

    return (
        <nav data-testid="top-bar" className="max-w-1440 text-base flex flex-row z-30 wh-8 mt-9 ml-9 mr-9 mb-9">
            <div className="w-[85%] mr-4 flex items-center bg-stone-800">
                <Marquee />
            </div>
            <div className="w-[15%] flex items-center z-40 bg-stone-800">
                <p className="pl-2 pr-2 pt-1 pb-1 text-stone-100">
                    <span className="hidden sm:inline">{userName}</span>
                    <span className="sm:hidden sm:content-center">Menu</span>
                </p>
            </div>
        </nav>
    );
}
