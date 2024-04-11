'use client';
import { useState } from 'react';

export default function MainPageMiddle() {
    const [selectedImage, setSelectedImage] = useState(0);
    const imageClassNames = [
        "flex flex-row items-center justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/buffetHero.jpg')]",
        "flex flex-row items-center justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/streetFood.jpg')]",
        "flex flex-row items-center justify-between w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/image_1.png')]",
        // "w-full h-[65vh] bg-gray-300 bg-cover relative bg-[url('/buffetHero.jpg')]",
    
    ];

    const changeImage = () => {
        const nextIndex = (selectedImage + 1) % imageClassNames.length;
        setSelectedImage(nextIndex);
    };
    // const selectedImage = "/buffetHero.jpg";


    const crownStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '2px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    };
    const [selectedNumber, setSelectedNumber] = useState(0);
    const numbers = Array.from({length: imageClassNames.length}, (_, i) => i + 1); // Array of numbers from 1 to 10

    const changeNumber = (direction:string) => {
        if (direction === 'up' ) {
            setSelectedNumber((selectedNumber - 1 + imageClassNames.length)%imageClassNames.length);
            setSelectedImage(selectedNumber);
        } else if (direction === 'down') {

            setSelectedNumber((selectedNumber + 1)%imageClassNames.length);
            setSelectedImage(selectedNumber);
        }
    };


    return (
    <div className="flex flex-col w-full h-full pl-9 gap-9">
        <div className={imageClassNames[selectedImage]}>
            <div className="w-[35%] h-full backdrop-blur-md relative flex flex-col items-start p-10">
                <div className="text-[60px] uppercase font-bold mt-9">
                    Super Buffet
                </div>
                <div className="w-[80%]">
                    Book with us today and savor the deliciousness all year long.
                </div>
            </div>
            <div className="flex items-center mr-10 transition-all">
                <button className="w-12 h-12 rounded-full border-2 border-black flex justify-center items-center cursor-pointer mr-2" onClick={() => changeNumber('down')}>
                    <span>&#9660;</span>
                </button>
                <div className="flex flex-col items-center text-[30px]">
                    <div>{selectedNumber > 1 ? selectedNumber : ''}</div>
                    <div className="text-[50px]">{selectedNumber + 1}</div>
                    <div>{selectedNumber < numbers.length ? selectedNumber + 2 : ''}</div>
                </div>
                <button className="w-12 h-12 rounded-full border-2 border-black flex justify-center items-center cursor-pointer ml-2" onClick={() => changeNumber('up')}>
                    <span>&#9650;</span>
                </button>
            </div>
        </div>

        <div className="text-[60px] text-black">
            test
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-black flex justify-center items-center cursor-pointer fixed right-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md" onClick={changeImage} >
            <span>&#9650;</span>
        </div>
    </div>
    );
}