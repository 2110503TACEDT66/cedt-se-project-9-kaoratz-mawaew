"use client"
import { Box , Rating } from '@mui/material';
import { useState } from 'react';
import handleCreate from './ReviewAction';


export default function ReviewSection({rid} : {rid: string}){

    const [rating, setRating] = useState<number|null>(0);
    const [comment, setComment] = useState<string>("");

    return(
        <div className='w-full text-center flex flex-col items-center justify-center'>
                <Box sx={{
                    
                    borderRadius: '8px', 
                }}>
                    <Rating className='' size="large" onChange={(e, newValue) => {setRating(newValue)}} value={rating} defaultValue={0} style={{color: 'black'}}/>
                </Box>
                
                <br/>
                <div className='relative border-black border-2 w-1/2 rounded-3xl bg-[#f5f5f5] '>
                    <input className='focus:outline-none w-[90%] h-20  bg-[#f5f5f5]  pl-4 pt-2 resize-none' onChange={(e) => setComment(e.target.value)} value={comment} placeholder='let show your opinion...'></input>
                    <button className='absolute right-3 bottom-3' onClick={(e) => { (rating && comment)? handleCreate(rid, rating, comment) : alert('Invalid review')}} ><img src="/sentButton.svg" alt="" /></button>
                </div>
                
        </div>
    );
}