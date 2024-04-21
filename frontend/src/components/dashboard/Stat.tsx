export default function Stat() {
    return (
        <table className="mt-12">
            <tbody>
                <tr>
                    <td className="pr-9 text-base border-r-2 border-black font-mono">
                        <p>Current reservation</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">02</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="px-9 text-base border-r-2 border-black font-mono">
                        <p>In this year</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">57</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                    <td className="pl-9 text-base font-mono">
                        <p>For all time</p>
                        <div className="inline-flex items-center gap-4 mt-4">
                            <h1 className="text-4xl font-bold">90</h1>
                            <p>reservation</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}