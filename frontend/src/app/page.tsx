// pages/index.tsx

import MainPageMiddle from '@/components/mainpage/herosection';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
      <main className="container w-[88%]">
          <MainPageMiddle />
      </main>
  );
}

