'use client';

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface nominatimItem {
    place_id: string,
    licence: string,
    osm_type: string,
    osm_id: string,
    boundingbox: string[],
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number,
    icon: string
}


export default function MapSearchSection({

    setSelectedLocation

}:{
    selectedLocation: any,
    setSelectedLocation: Function
}){

    const NOMINATIM = "https://nominatim.openstreetmap.org/search";

    const [searchText, setSearchText] = useState<string>("");
    const [resultData, setResultData] = useState([]);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        console.log(`${NOMINATIM}?q=${searchText}&format=json&limit=10&addressdetails=1`),
        fetch(`${NOMINATIM}?q=${searchText}&format=json&limit=10&addressdetails=1`)
            .then((response) => response.json())
            .then((data) => {
                setResultData(data);
            });
        },1000)
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);


    return (
        <div className="w-[40%] h-[100%] flex flex-col">
            <div className="flex justify-center items-center font-mono">
                <TextField
                    id="outlined-basic"
                    label="Search Location"
                    variant="outlined"
                    style={{width: "100%"}}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    className="font-mono"
                />
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto mt-5">
                {
                    resultData.length > 0 ?
                    resultData.map((item : nominatimItem) => {
                        return (
                            <div key={item.osm_id} className="flex flex-row items-center font-mono gap-2"
                            onClick={()=>setSelectedLocation(item)}>
                                <div className="text-lg text-black"> {
                                    item.display_name
                                }</div>
                            </div>
                        );
                    })
                    :
                    <div className="text-xl text-black m-auto mt-10">
                        No data
                    </div>
                }
            </div>

        </div>
        
    );

}