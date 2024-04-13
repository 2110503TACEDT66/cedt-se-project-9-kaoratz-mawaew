// pages/index.tsx

import ImageUpload from '@/components/image-upload';
import MainPageMiddle from '@/components/mainPage/herosection';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
      <main className=" w-[88%]">
          <MainPageMiddle />
        
      </main>
  );
}