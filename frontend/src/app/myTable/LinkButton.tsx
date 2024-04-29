"use client"

import Link from "next/link";
import { reserveItem } from "../../../interface";
import handleDelete from "./MyTableAction";

export default function LinkButton({
        item
} : {
        item: reserveItem
}){
  
  return(
        <>

                <button id={item._id} className='w-[141px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                      hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-red-800 text-stone-800 hover:text-stone-100 transform 
                      hover:-translate-x-1 hover:-translate-y-1' onClick={(e) => {
                              handleDelete(item._id)
                      }}>Delete</button>
                <Link href={`/reservation/${item._id}`}>
                  <button className='w-[141px] h-[37px] border border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1'>Update</button>
                </Link>
        </>
    );
}