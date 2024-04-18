import { RestaurantItem } from "../../../interface"

export default function Tag({restaurantDetails}: {restaurantDetails: RestaurantItem}) {
    return (
        <div className="flex flex-col gap-5">
            <div className='flex flex-row justify-center items-center gap-5'>
                <h1 className="text-4xl font-bold text-primary text-nowrap">Tag</h1>
                <hr className='border-black border-1 flex-grow ' />
            </div>
            <div className='flex flex-row'>
                {
                    restaurantDetails.tag?.map((tag: string, index: number) => {
                        return (
                            <div key={index} className="border-2 border-black m-2 p-2 text-base">
                                {tag}
                            </div>
                        )})       
                }
            </div>
        </div>
    )
}