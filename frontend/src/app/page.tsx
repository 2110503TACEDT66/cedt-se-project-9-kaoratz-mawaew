// pages/index.tsx

import MainPageMiddle from '@/components/mainPage/HeroSection';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
      <main className=" w-[88%]">
          <MainPageMiddle />
      </main>
  );
}

