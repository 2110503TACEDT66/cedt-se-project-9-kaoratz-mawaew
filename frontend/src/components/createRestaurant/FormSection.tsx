"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import postRestaurant from "@/libs/postRestaurant";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ActionPostRestaurant } from "./FormSubmitAction";
import MapSection from "./MapSection";
import ImageUpload from "../image-upload";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function FormSection() {
    const { data: session } = useSession();
    if (!session) return null;


    const [location, setLocation] = useState(null);
    const [imageUrl, setImageUrl] = useState<string>("");



    const tags: Array<string> = [
        'Thai',
        'Japanese',
        'Chinese',
        'Italian',
        'American',
        'Mexican',
        'Indian',
        'Korean',
        'Vietnamese',
        'French'
    ];

    const [clickedChips, setClickedChips] = useState<Array<string>>([]);

    // fix this & rerender
    const handleChipClick = (chipType: string) => {
        // Toggle selected cuisine
        if (clickedChips.includes(chipType)) {
            setClickedChips(clickedChips.filter(chip => chip !== chipType));;

        } else {
            setClickedChips([...clickedChips, chipType])
        }
    };

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {

        const token = session?.user.token;

        if (!location) return alert("Please select location");

        const tags = clickedChips.join(',');

        const response = await ActionPostRestaurant(formData, token, location, tags , imageUrl ); // server action


    }

    return (
        <div className="w-full h-full flex flex-col  space-y-9 pl-9 pb-[5%]"  >
            <div className="">
                <p className="font-mono text-4xl font-bold ">Create Restaurant</p>
            </div>
            <div className="h-full w-[100%] ">
                <form action={handleSubmit} className="space-y-4 flex flex-col space-x-8 w-full h-full">

                    <div className="flex flex-col w-[100%] h-[100%] items-start space-y-8">

                        <div className="flex flex-row gap-[5%] w-[100%]">
                            <div className="flex flex-col w-[50%] space-y-6">
                                <div className="space-y-4">
                                    <p className="text-2xl font-mono">Restaurant</p>
                                    <TextField className="w-[100%] font-mono" name="name" variant="outlined" required />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-2xl font-mono">Operation hour</p>
                                    <div className="flex items-center space-x-6">

                                        <TextField className="w-[55%]" name="opentime" variant="outlined" required />
                                        <p className="text-2xl font-mono"> - </p>
                                        <TextField className="w-[50%]" name="closetime" variant="outlined" required />
                                    </div>
                                </div>
                            </div>
                            <div className="w-[45%] flex flex-col gap-[20%]">
                                
                                    <ImageUpload setImageUrl={setImageUrl}/>
                                
                            </div>

                        </div>
                        {/* under section */}
                        <div className="space-y-4 w-full h-full" >
                            <p className="text-2xl font-mono">Location</p>
                            <div className="flex flex-row w-full h-[42vh] gap-[5%]">
                                <div className="flex flex-col gap-4 w-[50%] h-[42vh]">
                                    <div className="flex space-x-4 h-full w-full">
                                        <div className="flex flex-col space-y-2 w-[100%]">
                                            <p className="text-xl font-mono">Address</p>
                                            <TextField name="address" variant="outlined" required />
                                            <p className="text-xl font-mono">Subdistrict</p>
                                            <TextField name="subdistrict" variant="outlined" required />
                                            <p className="text-xl font-mono">Region</p>
                                            <TextField name="region" variant="outlined" required />
                                        </div>
                                        <div className="flex flex-col space-y-2 w-[100%]">
                                            <p className="text-xl font-mono">District</p>
                                            <TextField name="district" variant="outlined" required />
                                            <p className="text-xl font-mono">Province</p>
                                            <TextField name="province" variant="outlined" required />
                                            <p className="text-xl font-mono">Postalcode</p>
                                            <TextField name="postalcode" variant="outlined" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-mono">Telephone</p>
                                        <TextField name="tel" variant="outlined" className="w-[100%]" required />
                                    </div>
                                </div>
                                <div className="w-[45%] h-[42vh]">
                                    <MapSection setLocation={setLocation} />
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col w-[50%] space-y-4">
                            <p className="font-mono text-2xl">Tag</p>
                            <Stack direction="row" spacing={1}>
                                {tags.map((tag) => {
                                    return (
                                        <div key={tag}>
                                            {
                                                clickedChips.includes(tag) ?
                                                    <Chip
                                                        label={`${tag}`}
                                                        deleteIcon={<DoneIcon />}
                                                        color='primary'
                                                        onClick={(e) => {
                                                            handleChipClick(tag);
                                                        }}
                                                    />
                                                    :
                                                    <Chip
                                                        label={`${tag}`}
                                                        deleteIcon={<DoneIcon />}
                                                        variant='outlined'
                                                        onClick={(e) => {
                                                            handleChipClick(tag);
                                                        }}
                                                    />
                                            }
                                        </div>
                                    );
                                }
                                )}
                            </Stack>
                        </div>

                    </div>
                    <div className="flex justify-center space-x-16 w-[95%]">

                        <div className="text-center text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-2/6"
                            onClick={(e) => {
                                e.stopPropagation()
                                router.back()
                            }}>Back
                        </div>

                        <button className="text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-[60%] ">
                            Publish Now!
                        </button>
                    </div>

                </form>


            </div>

        </div>

    );
}