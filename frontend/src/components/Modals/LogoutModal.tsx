"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogoutModal() {

    const searchParams = useSearchParams();
    const modal = searchParams.get('logout');
    const pathname = usePathname();

    return (
        <>
            {
                modal &&
                <dialog className="fixed inset-0 flex items-center justify-center z-10">
                    <Link
                        className="fixed inset-0 bg-black opacity-75 cursor-default"
                        href={pathname}
                        scroll={false}
                    />
                    <div className="bg-white p-5 rounded-lg w-1/4">
                        <h1 className="text-2xl font-bold">Are you sure you want to logout?</h1>
                        <div className="flex justify-end space-x-4 mt-5">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => signOut()}>Yes</button>
                            <Link href={pathname}>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">No</button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            }
        </>
    )
}
