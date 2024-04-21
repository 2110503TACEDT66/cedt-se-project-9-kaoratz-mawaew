import TableCatalog from "./TableCatalog"
import { Suspense } from "react";
import TableGraphics from "./TableGraphics";
import MyTableSkeleton from "../skeleton/myTableSkeleton";
export default function Table() {



    return (
        <div className="w-full h-max xl:h-[85vh] flex flex-col items-center justify-center gap-3">
            <p className='h-[10%] text-4xl font-bold'>Your Reservations</p>
            <Suspense fallback={<div className="h-[50%]"><MyTableSkeleton/></div>}>
                <TableCatalog />
            </Suspense>
                <TableGraphics />
        </div>
    );
}
