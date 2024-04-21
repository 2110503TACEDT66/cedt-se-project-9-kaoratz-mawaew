
import { getServerSession } from 'next-auth';
import { authOptions } from '../../components/auth';
import getReservations from '@/libs/getReservations';
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import LinkButton from './LinkButton';
import { reserveItem } from '../../../interface';
import TableCatalog from '@/components/myTable/TableCatalog';
import AdminTable from '@/components/myTable/TheTable';

export default async function Home() {

  return (
    <main className='w-[88%] h-full'>
      <AdminTable />
    </main>
  );
}