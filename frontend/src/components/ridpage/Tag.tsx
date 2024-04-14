import { RestaurantItem } from "../../../interface"

export default function Tag({restaurantDetails}: {restaurantDetails: RestaurantItem}) {
    return (
        <>
            <div className='flex justify-start w-[50%] ml-7'>
                <h1 className="text-4xl mb-1 text-primary">Tag</h1>
                <hr className='border-black border-1 w-full m-5'/>
            </div>
            <div className='flex flex-row ml-6'>
                {
                    restaurantDetails.tag?.map((tag: string, index: number) => {
                        return (
                            <div key={index} className="border-2 border-black m-2 p-2 text-base">
                                {tag}
                            </div>
                        )})       
                }
            </div>
        </>
    )
}