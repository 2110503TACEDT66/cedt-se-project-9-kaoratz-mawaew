"use client";

import { signOut } from "next-auth/react";
import { useModal } from "@/hooks/modal-store";
import { Dialog, DialogPanel, Button } from "@tremor/react";

export default function LogoutModal() {

    const { isOpen, type, openModal, closeModal } = useModal();


    const isModalOpen = isOpen && type === 'logout';


    const handleClose = () => {
        closeModal();
    }


    return (
        <>
                <Dialog open={isModalOpen} onClose={() => handleClose()} static={true}>
                    <DialogPanel color="">
                        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Are you sure you want to sign out?
                        </h3>
                        <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            if you sign out, you might lose your account permanently, due to our security policy.
                        </p>
                        <Button className="mt-8 w-full bg-primary border-black hover:bg-stone-800 hover:border-stone-800" onClick={() => {
                            signOut();
                            handleClose();
                        }}>
                            Sign Out
                        </Button>
                    </DialogPanel>
                </Dialog>
            
        </>
    )
}