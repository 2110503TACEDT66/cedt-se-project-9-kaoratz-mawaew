import { getServerSession } from "next-auth";
import { reserveItem } from "../../../interface";
import getReservations from "@/libs/getReservations";
import { authOptions } from "../auth";
import dayjs from "dayjs";
import Link from "next/link";
import LinkButton from "@/app/myTable/LinkButton";

export default async function TableCatalog() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) return null
    const reserved = await getReservations(session.user.token);
    const activeRes = reserved.data.filter((item: reserveItem) => !item.completed);

    if(activeRes.length === 0) return (
        <div className='h-[50%] flex flex-col gap-5 justify-center items-center'>
            <p className="font-semibold text-lg">No reservations found</p>
            <Link href='/restaurant'>
                <div className="p-3 bg-primary text-white font-semibol rounded-md hover:bg-black hover:shadow-lg transition-all">
                    Go to restaurant page
                </div>
            </Link>
        </div>
    );


    return (
        <>
            <div className=' h-[50%]  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-black overflow-y-auto'>
                {


                    activeRes.map((item: reserveItem) => {
                       
                        return (
                            <div key={item._id} className='w-[298px] h-[300px] border border-stone-800 p-2'>
                                <div>
                                    <p className='text-4xl text-left mb-4'>{item.restaurant.name}</p>
                                    <p className='text-base text-left mb-4'>{dayjs(item.createdAt).format('YYYY-MM-DD')}</p>
                                </div>
                                <p className='text-base text-left mb-4'>Reservation Date:
                                </p>
                                <div className='flex flex-row justify-between'>
                                    <div>
                                        <p className='text-base inline-block border border-stone-800 p-2'>
                                            {dayjs(item.resvDate).format('YYYY-MM-DD')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-base inline-block border border-stone-800 p-2'>
                                            {dayjs(item.resvDate).format('HH:mm')}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row mt-2 relative bottom-0 justify-between'>

                                        <LinkButton item={item} />
                                </div>


                            </div>
                        );
                    })}
            </div>
        </>
    );
}

