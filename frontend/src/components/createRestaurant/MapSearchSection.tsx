'use client';

import { Input, TextField } from "@mui/material";
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
    selectedLocation,
    setSelectedLocation

}:{
    selectedLocation: any,
    setSelectedLocation: Function
}){

    const NOMINATIM = "https://nominatim.openstreetmap.org/search";
    
    const params = {
        q: "searchText",
        format: "json",
        limit: 10,
    };

    const [searchText, setSearchText] = useState<string>("");
    const [resultData, setResultData] = useState([]);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        fetch(`${NOMINATIM}?q=${searchText}&format=json&limit=10`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setResultData(data);
            });
        },1000)
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);


    return (
        <div className="w-[40%] h-[60vh] flex flex-col">
            <div className="flex justify-center items-center">
                <TextField
                    id="outlined-basic"
                    label="Search Location"
                    variant="outlined"
                    style={{width: "100%"}}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto mt-5">
                {
                    resultData.length > 0 ?
                    resultData.map((item : nominatimItem) => {
                        return (
                            <div key={item.osm_id} className="flex flex-row items-center gap-2"
                            onClick={(e)=>setSelectedLocation(item)}>
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