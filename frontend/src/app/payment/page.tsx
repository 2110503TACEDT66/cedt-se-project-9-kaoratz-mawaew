import Link from "next/link";

export default function payment() {
    return (
        <div className="w-[70%] pl-4 pr-4">
            <h1 className="text-4xl	font-bold mb-16">Checkout</h1>
            <div className="flex flex-row mb-4">
                <div className="w-[50%]">
                    <p className="text-2xl mb-4	">Restaurant_Name</p>
                    <p className="text-2xl mb-4	">Date</p>
                    <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">Mon 1 Jan 1999</p>
                    <div>
                        <div>
                            <p className="text-2xl mb-4	">Time</p>
                            <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">12:00</p>
                        </div>
                        <div>
                            <p className="text-2xl mb-4	">Payment Methods</p>
                            <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">credit</p>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <p className="text-2xl mb-9">Payment</p>
                        <div className="flex flex-row justify-between mb-9	">
                            <p className="text-base">Amount</p>
                            <p className="text-base">5,000 THB</p>
                        </div>
                        <div className="flex flex-row justify-between mb-9	">
                            <p className="text-base">Mr.xxxx xxxxx</p>
                            <p className="text-base">date and time now</p>
                        </div>
                    <p className="text-2xl mb-4">total</p>
                    <p className="text-4xl mb-4 inline-block border border-stone-800 p-2">THB: 5,000.00</p>
                </div>
            </div>
            <div className="flex flex-row">
            <button className="text-base w-[20%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Back</button>
                        
            <button className="text-base w-[60%] mb-4 mr-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Pay It!</button>
                        
            <button className="text-base w-[20%] mb-4 inline-block border border-stone-800 p-2 text-center relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">Cancel</button>
            </div>

        </div>
    );
}