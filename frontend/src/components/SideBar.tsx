'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useModal } from "@/hooks/modal-store";

export function LeftSideBar() {

  const { openModal } = useModal();

  const { data: session } = useSession();

  return (
    <div className="w-[12%] border-r-2 pr-5 border-r-gray-900">
      <ul>
        {session ? (
          <>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Home</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/restaurant">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Eatery</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/myTable">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">My Table</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all"
                onClick={() => openModal("logout")}
              >Logout</p>
            </li>
          </>
        ) : (
          <>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Home</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/restaurant">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Eatery</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/login">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Login</p>
              </Link>
            </li>
            <li className="text-4xl pb-9 mt-4 mb-4 transition duration-200 transform">
              <Link href="/register">
                <p className="text-stone-800 pb-9 cursor-pointer hover:font-medium transition-all">Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}