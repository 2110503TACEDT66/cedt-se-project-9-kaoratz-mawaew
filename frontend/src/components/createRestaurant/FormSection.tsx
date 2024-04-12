"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import postRestaurant from "@/libs/postRestaurant";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ActionPostRestaurant } from "./FormSubmitAction";
import MapSection from "./MapSection";


export default function FormSection() {
    const { data: session } = useSession();
    if(!session) return null; 


    const [location, setLocation] = useState(null);


    const handleSubmit = async (formData: FormData) => {

        const token = session?.user.token;
        
        if(!location) return alert("Please select location");
        const response = await ActionPostRestaurant(formData, token, location); 

    }
        

    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black mt-[400px]">
            <form action={handleSubmit} className="space-y-4 flex flex-col">

                <TextField name="name" label="Name" variant="outlined" />
                <TextField name="address" label="Address" variant="outlined" />
                <TextField name="subdistrict" label="Subdistrict" variant="outlined" />
                <TextField name="district" label="District" variant="outlined" />
                <TextField name="province" label="Province" variant="outlined" />
                <TextField name="postalcode" label="Postal Code" variant="outlined" />
                <TextField name="region" label="Region" variant="outlined" />
                <TextField name="tel" label="Telephone" variant="outlined" />
                <TextField name="opentime" label="Open Time" variant="outlined" />
                <TextField name="closetime" label="Close Time" variant="outlined" />
                <TextField name="imageUrl" label="Image URL" variant="outlined" />

                
                <button className="mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200">
                    Submit
                </button>
            </form>
            <MapSection setLocation={setLocation} />
        </div>
    );
}