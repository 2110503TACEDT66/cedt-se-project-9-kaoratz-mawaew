import { Rating } from "@mui/material"

export default function CommentCard() {
    return (
        <div className="p-3 border-black border-2 w-full">
            <h1 className="text-xl font-bold">Restaurant Name</h1>
            <Rating className="mt-1" name="stars" value={5} readOnly size="small" style={{color: 'black'}}/>
            <p className="text-[14px] text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eveniet nihil deleniti voluptatum ipsam veniam non recusandae ut accusamus molestias ratione fugiat amet, nisi possimus quibusdam quisquam voluptas explicabo magnam.</p>
        </div>
    )
}