import React from 'react';

const Nonsession = () => {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center mt-300">
                <div className="px-4 py-3 text-center">
                    <h1 className="text-2xl font-semibold text-black">Sorry</h1>
                    <p className="mt-3 text-lg text-gray-700">You need to be signed in to access this page.</p>
                </div>
            </div>
        );
    }

export default Nonsession;
