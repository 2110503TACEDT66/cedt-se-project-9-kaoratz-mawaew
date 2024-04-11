"use client";

import { TextField } from "@mui/material";


export default function FormSection() {
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
            <form className="space-y-4 flex flex-col">

                <TextField label="Name" variant="outlined" />
                <TextField label="Address" variant="outlined" />
                <TextField label="Subdistrict" variant="outlined" />
                <TextField label="District" variant="outlined" />
                <TextField label="Province" variant="outlined" />
                <TextField label="Postal Code" variant="outlined" />
                <TextField label="Region" variant="outlined" />
                <TextField label="Telephone" variant="outlined" />
                <TextField label="Open Time" variant="outlined" />
                <TextField label="Close Time" variant="outlined" />
                <TextField label="Image URL" variant="outlined" />
                
                <button className="mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
}