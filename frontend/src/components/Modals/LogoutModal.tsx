"use client";

import { signOut } from "next-auth/react";
import { useModal } from "@/hooks/modal-store";

export default function LogoutModal() {

    const { isOpen, type, openModal, closeModal } = useModal();


    const isModalOpen = isOpen && type === 'logout';


    const handleClose = () => {
        closeModal();
    }


    return (
        <>

            {
                isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center transition-all animate-modalin">
                        <div className="fixed inset-0  z-40" onClick={handleClose}></div>
                        <div className="w-[27%] h-[25%] blur-2xl opacity-40 bg-stone-800 absolute"/>
                        <div className="bg-white px-8 py-8 rounded-md w-1/4 z-50 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                            <h1 className="text-xl">Are you sure you want to logout?</h1>
                            <div className="flex justify-end space-x-4 mt-5">
                                <button className="bg-primary text-white px-5 py-2 rounded-md hover:shadow-lg 
                                 transition-all" onClick={() => signOut()}>Sign Out</button>
                                {/* <button className="bg-gray-500 text-white px-3 py-2 rounded-md">No</button> */}
                            </div>
                        </div>
                </div>
            }
        </>
    )
}
