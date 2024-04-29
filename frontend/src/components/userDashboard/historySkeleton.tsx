export default function HistorySkeleton() {
    return (
        <div className="w-full">
            <table className="text-center text-sm w-full items-center border-b-2 border-gray-900">
                <thead>
                    <tr>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date of Reservation</th>
                        <th className="w-[40%] text-lg py-4 font-semibold border-r-2 border-gray-900">Restaurant</th>
                        <th className="w-[15%] text-lg py-4 font-semibold border-r-2 border-gray-900">Date of Issue</th>
                        <th className="w-[10%] text-lg py-4 font-semibold border-r-2 border-gray-900">Status</th>
                        <th className="w-[10%] text-lg py-4 font-semibold text-center">Review</th>
                    </tr>
                </thead>
            </table>
            <div className="w-full overflow-y-scroll max-h-[384px] no-scrollbar">
                <table className="text-center text-sm w-full items-center ">
                    <tbody>
                        <tr>
                            <td className="w-[15%] py-4 border-r-2 border-gray-900">
                                loading ...
                            </td>
                            <td className="w-[40%] py-4 border-r-2 border-gray-900">
                                loading ...
                            </td>
                            <td className="w-[15%] py-4 border-r-2 border-gray-900">
                                loading ...
                            </td>
                            <td className="w-[10%] py-4 border-r-2 border-gray-900">
                                loading ...
                            </td>
                            <td className="w-[10%] py-4">
                                -
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
