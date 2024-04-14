
import { getServerSession } from 'next-auth';
import { authOptions } from '../../components/auth';
import getReservations from '@/libs/getReservations';
import { MouseEventHandler, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import deleteReservation from '@/libs/deleteReservation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LinkButton from './LinkButton';
import { reserveItem } from '../../../interface';

export default async function Home() {
  
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null
  const reserved = await getReservations(session.user.token);

  return (
    <main className='w-[70%] text-center'>
      <Suspense fallback={<div>Loading... <LinearProgress /></div>}>

        <p className='text-4xl mb-16 ml-7 text-left font-bold'>Your Reservations</p>
        <div className='flex flex-auto justify-between'>
          {
            reserved.data.map((item: reserveItem) => (
              <div key={item.id} className='w-[298px] h-[248px] border border-stone-800 p-2'>
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

                <LinkButton item={item}/>
              </div>
            ))
          }
        </div>
      </Suspense>
    </main>
  );
}