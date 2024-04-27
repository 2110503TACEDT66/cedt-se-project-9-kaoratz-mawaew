'use client';

import LogoutModal from "@/components/Modals/LogoutModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {

    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;


    return (
        <>
            <LogoutModal />
        </>
    )
}
