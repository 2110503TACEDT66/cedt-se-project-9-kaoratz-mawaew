
export default function StatSkeleton() {
    return (
        <table className="h-[10vh]">
            <tbody>
                <tr>
                    <td className="pr-9 text-base border-r-2 border-black">
                        <p>Current reservation</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">--</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="px-9 text-base border-r-2 border-black">
                        <p>In this year</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">--</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="pl-9 text-base">
                        <p>For all time</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">--</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
