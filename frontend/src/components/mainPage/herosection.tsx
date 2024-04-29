'use client';
import { useState } from 'react';

export default function MainPageMiddle() {
    const [selectedImage, setSelectedImage] = useState(0);
    const imageClassNames = [
        "flex flex-row items-center text-white justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/buffetHero.jpg')]",
        "flex flex-row items-center text-white justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/streetFood.jpg')]",
        "flex flex-row items-center justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/image_1.png')]",
    ];

    const formatNumber = (number: number) => {
        return number < 10 ? `0${number}` : number;
    };

    const changeSelectedImageNumber = (direction: string) => {
        if (direction === 'up' && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        } else if (direction === 'down' && selectedImage < imageClassNames.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    return (
        <div className="flex flex-col w-full h-full pl-9 gap-9">
            <div className={`transition-transform delay-150 duration-500 ${imageClassNames[selectedImage]}`}>
                <div className="w-[35%] h-full backdrop-blur relative flex flex-col items-start p-10">
                    <div className="text-[40px] uppercase font-bold mt-9">
                        Discover your finest dining experience.
                    </div>
                    <div className="w-[80%]">
                        Book with us today and savor the deliciousness all year long. <br/>Wtf? how is that possible.
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className="flex items-center transition-transform delay-150 duration-500">
                        <div className="flex flex-col items-start space-y-4 text-3xl font-bold">
                            <button onClick={() => changeSelectedImageNumber('up')}>{selectedImage > 0 ? formatNumber(selectedImage) : ''}</button>
                            <div className="flex items-center">
                                <button className="text-8xl backdrop-blur pl-4">{formatNumber(selectedImage + 1)}</button>
                                <hr className='border-stone-100 grow min-w-24 ml-4' />
                            </div>
                            <button className='' onClick={() => changeSelectedImageNumber('down')}>{selectedImage < imageClassNames.length - 1 ? formatNumber(selectedImage + 2) : ''}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}