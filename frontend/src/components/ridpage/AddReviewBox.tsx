'use client'

import { useState } from "react"
import { Box, Rating } from "@mui/material"
import makeReview from "@/app/(restaurantInfo)/restaurant/[rid]/ReviewAction"

export default function AddReviewBox({rid}: {rid: string}) {

    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number|null>();

    return (
        <div className='w-full text-center flex flex-col items-center justify-center mb-7'>
                <img src='/starBlack.svg'/>
                <img src='/starWhite.svg'/>
                <Box sx={{
                    
                    borderRadius: '8px', 
                }}>
                    <Rating className='' size="large" defaultValue={0} style={{ color: 'black'}} 
                        sx={{
                        '& .MuiRating-iconHover': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        },
                        }}
                        onChange={(_, value) => setRating(value)}
                        value={rating}/>
                </Box>
                
                <br/>
                <div className='relative border-black border-2 w-1/2 rounded-3xl bg-[#f5f5f5] '>
                    <input className='focus:outline-none w-[90%] h-20  bg-[#f5f5f5]  pl-4 pt-2 resize-none' 
                        type="text" 
                        placeholder='let show your opinion...' 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}/>
                    <button className='absolute right-3 bottom-3' onClick={() => {if (rating) makeReview(comment, rid, rating);}}>
                        <img src="/sentButton.svg" alt="" />
                    </button>
                </div>
                
            </div>
    )
}