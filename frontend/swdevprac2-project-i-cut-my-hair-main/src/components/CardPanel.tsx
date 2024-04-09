'use client'
import { useReducer, useState } from "react";
import Card from "./Card";
import { useRef,useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";

export default function CardPanel(){
    const [RestaurantResponse, setRestaurantResponse] = useState(null)
    useEffect(() => {
        const fetchData = async()=>{
        const restaurants = await getRestaurants()
        setRestaurantResponse(restaurants)
    }
    fetchData()
},[]
    )

    if(!RestaurantResponse) return (<p>Restaurant Panel is Loading...</p>)
/*
    return(
    <div>
        <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around",
    justifyContent:"space-around", flexWrap:"wrap", padding:"10px", backgroundColor:"whitesmoke"}}>
        {
        hospitalResponse.data.map((cardItem)=>(
            <Link href={`/hospital/${cardItem.id}`} className="w-1/5">
            <Card hospitalName={cardItem.name} imgSrc={cardItem.picture} onChangeRating={handleRatingChange}/> 
            </Link>
        ))
        }
        <div className="w-full text-xl font-medium">Ratings</div>

            </div>
            <div>
                {Array.from(ratingList).map(([hospitalName, rating]) => (
                    <div key={hospitalName} data-testid = {hospitalName}
                    onClick={()=> dispatch({type:'RESET_RATING', hospitalName:hospitalName, rating:0})}>
                        {hospitalName}: {rating}
                    </div>
                ))}
        </div>

    </div>
    );*/
}