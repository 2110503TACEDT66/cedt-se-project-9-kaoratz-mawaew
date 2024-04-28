import { Rating } from "@mui/material"
import { ReviewItem, RestaurantItem } from "../../../interface"
import getRestaurant from "@/libs/getRestaurant"
import moment from 'moment';

export default async function CommentCard({ review }: { review: ReviewItem }) {
    const restaurant = await getRestaurant(String(review.restaurant))
    const dateObject = moment(review.createAt);
    const formattedDate = dateObject.format('DD MMM YYYY');
    
    console.log(dateObject)
    return (
        <div className="p-3 border-black border-2 space-y-2 w-full">
            <h1 className="text-xl font-bold">{restaurant.data.name}</h1>
            <Rating className="mt-1" name="stars" value={review.rating} readOnly size="small" style={{ color: 'black' }} />
            <div className="flex flex-row items-center content-center">
                <p className="text-base text-primary mr-4">{`${formattedDate}`}</p>
                <hr className="border-zinc-900 grow"/>
            </div>
            <p className="text-base text-primary">{review.comment}</p>
            <p className="text-xs text-primary mt-4 flex justify-end">{`By ${review.name}`}</p>
        </div>
    )
}
