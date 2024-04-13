import { RestaurantItem } from "../../../interface"

export default function RestaurantTime({restaurantDetails, flag}: {restaurantDetails: RestaurantItem, flag: boolean}) {
    return (
        <div className="mb-5 shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
            <div className="border-2 border-black px-6 py-2 bg-[#b1b3aa] shadow-[-4px_-4px_rgba(0,0,0,0.3)]">
                <table className="w-full text-4xl mb-2">
                    <tr>
                        <td>Mon-Fri</td>
                        <td className="text-right">
                            {
                                flag ? 
                                    <p className="text-4xl text-green-600 font-bold">OPENED</p>:
                                    <p className="text-4xl text-red-800 font-bold">CLOSED</p>
                            }
                        </td>
                    </tr>
                </table>
                <p className="w-full text-center text-[76px]">{`${restaurantDetails.opentime} - ${restaurantDetails.closetime}`}</p>
            </div>
        </div>
    )
}