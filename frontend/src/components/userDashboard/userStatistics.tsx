import { getServerSession } from "next-auth";
import { authOptions } from '../../components/auth';

export default function userStatistics({ upComing, thisYear, allTime }: { upComing: number, thisYear: number, allTime: number }) {
    return (
        <>
            {
                <div className="flex flex-row space-x-9">
                    <div className="flex flex-row pr-9 border-r-2 border-zinc-900">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-base">Current reservation</p>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>
                                    <p className="text-4xl">{upComing}</p>
                                </div>
                                <div className="content-end">
                                    <p className="text-base">reservation</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row pr-9 border-r-2 border-zinc-900">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="text-base">In this year</p>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>
                                    <p className="text-4xl">{thisYear}</p>
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
                                    <p className="text-4xl">{allTime}</p>
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