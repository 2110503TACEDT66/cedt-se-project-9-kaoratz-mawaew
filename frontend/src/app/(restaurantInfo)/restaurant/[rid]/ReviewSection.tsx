"use client"
import { Box , Rating } from '@mui/material';
import { useState } from 'react';
import handleCreate from './ReviewAction';
import { useSession } from "next-auth/react";

export default function ReviewSection({rid} : {rid: string}){
    const {data: session} = useSession();

    const [rating, setRating] = useState<number|null>(0);
    const [comment, setComment] = useState<string>("");

    return(
        <div className='w-full text-center flex flex-col items-center justify-center text-primary'>
                <Box sx={{
                    borderRadius: '8px', 
                }}>
                    <Rating id='rating' size="large" onChange={(e, newValue) => {setRating(newValue)}} value={rating} defaultValue={0} style={{color: 'black'}}/>
                </Box>
                
                <br/>
                <div className='flex flex-row justify-center items-center border-black border-2 w-1/2 rounded-sm gap-4 '>
                    <input id='reviewInput' className='focus:outline-none w-[90%] h-20  pl-4 pt-2 resize-none bg-transparent' onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Add a comment...'></input>
                    <button id="sendReview" className='w-[10%]' onClick={(e) => {
                        if(!session || !session.user.token){
                            alert('Please log in to post review')
                        }
                        else{ 
                            if(rating && comment) {
                                    handleCreate(rid, rating, comment);
                            } else {
                                alert('Please fill in all fields')
                            }
                        }
                        }}>
                            <img src="/sentButton.svg" alt="" />
                    </button>
                </div>
                
        </div>
    );
}