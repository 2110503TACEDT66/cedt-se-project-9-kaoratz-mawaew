import { Button } from "@mui/material";
import Link from "next/link";

export default function HeroDash() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-10">
            <div className="text-3xl">
                Dashboard (sprint 2)
            </div>
            <Link href="/restaurant/create" className="w-[20%] flex flex-row items-center justify-center" prefetch>
                <div className="p-5 bg-black text-white text-[30px] w-full rounded-md text-center">
                    Create Restaurant
                </div>
            </Link>

        </div>
    )
}
