"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { ActionPostRestaurant } from "./FormSubmitAction";
import MapSection from "./MapSection";
import ImageUpload from "../image-upload";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { forminput } from "../../../interface";




export default function FormSection() {
    const { data: session } = useSession();
    if (!session) return null;

    const [location, setLocation] = useState(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm<forminput>()


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

    const onSubmit: SubmitHandler<forminput> = async (formData) => {
        const token = session?.user.token;
        const tags = clickedChips.join(',');
        await ActionPostRestaurant(formData, token, location, tags, imageUrl); // server action 
    }

    return (

        <div className="w-full h-full flex flex-col  space-y-9 pl-9 pb-[5%]"  >
            <div className="">
                <p className="font-mono text-4xl font-bold ">Create Restaurant</p>
            </div>
            <div className="h-full w-[100%] ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col space-x-8 w-full h-[80%]">

                    <div className="flex flex-col w-[100%] h-[100%] items-start space-y-4">

                        <div className="flex flex-row gap-[5%] w-[100%] ">
                            <div className="flex flex-col w-[50%] space-y-6">
                                <div className="space-y-4">
                                    <p className="text-2xl font-mono">Restaurant</p>
                                    <TextField
                                        id="name"
                                        className="w-[100%] font-mono"
                                        variant="outlined"
                                        error={errors.name ? true : false}
                                        helperText={errors.name && "*This field is required"}
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-2xl font-mono">Operation hour</p>
                                    <div className="flex items-center space-x-6">

                                        <TextField className="w-[55%]" 
                                            variant="outlined" 
                                            error={errors.opentime?true:false}
                                            helperText={ errors.opentime&& "*This field is required"  } 
                                            {...register("opentime", { required: true,minLength:5,maxLength:5})}
                                            placeholder="HH:MM"/>
                                        <p className="text-2xl font-mono"> - </p>
                                        <TextField className="w-[50%]" 
                                            error={errors.closetime?true:false}
                                            helperText={ errors.closetime&& "*This field is required"  }
                                            {...register("closetime", { required: true,minLength:5,maxLength:5})}
                                            variant="outlined" 
                                            placeholder="HH:MM"
                                         />
                                    </div>
                                </div>
                            </div>
                            <div id="imageUploadContainer" className="w-[45%] flex flex-col gap-[20%]">
                                <ImageUpload setImageUrl={setImageUrl} imageUrl={null} />
                            </div>

                        </div>
                        {/* under section */}
                        <div className="space-y-6 w-full  " >
                            <p className="text-2xl font-mono">Location</p>
                            <div className="flex flex-row w-full h-[45vh] gap-[5%]">
                                <div className="flex flex-col gap-4 w-[50%] h-[42vh]">
                                    <div className="flex space-x-4 h-full w-full">
                                        <div className="flex flex-col space-y-2  w-[100%] h-[100%]">
                                            <p className="text-xl font-mono">Address</p>
                                            <TextField
                                                id="address"
                                                {...register("address", { required: true })}
                                                variant="outlined"
                                                error={errors.address ? true : false}
                                                helperText={errors.address && "*This field is required"} />
                                            <p className="text-xl font-mono">Subdistrict</p>
                                            <TextField
                                                id="subdistrict"
                                                {...register("subdistrict", { required: true })}
                                                variant="outlined"
                                                error={errors.subdistrict ? true : false}
                                                helperText={errors.subdistrict && "*This field is required"} />
                                            <p className="text-xl font-mono">Region</p>
                                            <TextField
                                                id="region"
                                                {...register("region", { required: true })}
                                                variant="outlined"
                                                error={errors.region ? true : false}
                                                helperText={errors.region && "*This field is required"} />
                                        </div>
                                        <div className="flex flex-col space-y-2  w-[100%] h-[100%]">
                                            <p className="text-xl font-mono">District</p>
                                            <TextField
                                                id="district"
                                                {...register("district", { required: true })}
                                                error={errors.district ? true : false}
                                                helperText={errors.district && "*This field is required"}
                                                variant="outlined" />
                                            <p className="text-xl font-mono">Province</p>

                                            <TextField
                                                id="province"
                                                error={errors.province ? true : false}
                                                helperText={errors.province && "*This field is required"}
                                                {...register("province", { required: true })} />
                                            <p className="text-xl font-mono">Postalcode</p>
                                            <TextField
                                                id="postalcode"
                                                variant="outlined"
                                                error={errors.postalcode ? true : false}
                                                helperText={errors.postalcode && "*This field is required"}
                                                {...register("postalcode", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 w-[100%] h-[100%]">
                                        <p className="text-xl font-mono">Telephone</p>
                                        <TextField
                                            id="tel"
                                            {...register("tel", { required: true })}
                                            variant="outlined"
                                            className="w-[100%]"
                                            error={errors.tel ? true : false}
                                            helperText={errors.tel && "*This field is required"} />
                                    </div>
                                </div>
                                <div className="w-[45%] h-[42vh]">
                                    <MapSection setLocation={setLocation} restaurant={null} />
                                </div>
                            </div>
                            <div className="flex flex-col w-[50%] space-y-2 ">
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





                    </div>
                    <div className="flex justify-center space-x-16 w-[95%]">

                        <div id="backButton" className="text-center text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-2/6"
                            onClick={(e) => {
                                e.stopPropagation()
                                router.back()
                            }}>Back
                        </div>

                        <button id="publish" className="text-2xl font-mono mt-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-[60%] ">
                            Publish Now!
                        </button>
                    </div>

                </form>


            </div>

        </div>

    );
}