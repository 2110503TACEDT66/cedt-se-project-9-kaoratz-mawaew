"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import postRestaurant from "@/libs/postRestaurant";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ActionPostRestaurant } from "./FormSubmitAction";
import MapSection from "./MapSection";
import ImageUpload from "../image-upload";


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
            <div className=" h-screen">
                <form action={handleSubmit} className="space-y-4 flex flex-col space-x-8">
                    <div className=" ml-20">
                        <p className="font-mono text-6xl font-bold ">Create Restaurant</p>
                    </div>
                    <div className="">
                        <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-3xl font-mono">Restaurant</p>
                            <TextField className="w-[41.5%] font-mono"name="name" variant="outlined" />
                        </div>
                        <div className="space-y-4">
                            <p className="text-3xl font-mono">Operation hour</p>
                            <div className="flex items-center space-x-6">
                                
                                <TextField className="w-[17%]" variant="outlined" />
                                <p className="text-3xl font-mono"> - </p>
                                <TextField className="w-[17%]" variant="outlined" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-3xl font-mono">Location</p>
                            <div className="flex space-x-6">
                                <div className="flex flex-col space-y-2 w-[20%]">
                                    <p className="text-xl font-mono">Address</p>
                                    <TextField name="address"  variant="outlined" />
                                    <p className="text-xl font-mono">Subdistrict</p>
                                    <TextField name="subdistrict"  variant="outlined" />
                                    <p className="text-xl font-mono">Region</p>
                                    <TextField name="region"  variant="outlined" />
                                </div>
                                <div className="flex flex-col space-y-2 w-[20%]">
                                    <p className="text-xl font-mono">District</p>
                                    <TextField name="district"  variant="outlined" />
                                    <p className="text-xl font-mono">Province</p>
                                    <TextField name="province" variant="outlined" />
                                    <p className="text-xl font-mono">Postalcode</p>
                                    <TextField name="postalcode"  variant="outlined" />
                                </div>
                            </div>
                            <div className="s">
                                <p className="text-xl font-mono">Telephone</p>
                                <TextField name="tel" variant="outlined" className="w-[41.5%]" />
                            </div>
                        </div>
                        </div>
                        <div >
                            <div>
                                <ImageUpload></ImageUpload>
                            </div>
                            <div className=" bg-pink h-[500px] w-[300px]">
                                <MapSection setLocation={setLocation} />
                            </div>
                        </div>
                    </div>
                    

                
                
                    <div className="flex justify-center space-x-16">
                        <button className="text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-2/6">
                            Back
                        </button>
                        <button className="text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-[60%] ">
                            Publish Now!
                        </button>
                    </div>
                
                </form>
                
                
            </div>
            
            
        
    );
}