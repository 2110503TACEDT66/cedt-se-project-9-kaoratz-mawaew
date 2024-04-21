export default function userStatistics() {
    return (
        <>
            {
                <div className="flex flex-row space-x-9">
                    <div className="flex flex-row pl-9 border-r-4 border-indigo-500">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-base">Current reservation</p>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>
                                    <p className="text-4xl">02</p>
                                </div>
                                <div className="content-end">
                                    <p className="text-base">reservation</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-base">In this year</p>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>
                                    <p className="text-4xl">57</p>
                                </div>
                                <div className="content-end">
                                    <p className="text-base">reservation</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-base">for All time</p>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>
                                    <p className="text-4xl">90</p>
                                </div>
                                <div className="content-end">
                                    <p className="text-base">reservation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}