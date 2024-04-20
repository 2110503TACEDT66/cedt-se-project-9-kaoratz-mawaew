"use client"
import { TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form"
import { managerform,UserItem } from "../../../interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { RegisterAction } from "./RegisterAction";
import getUserProfile from "@/libs/getUserProfile";

interface Userdata{
    data:UserItem;
}


export default function RegisterManager() {
    const { data: session } = useSession();
    const [userProfile , setUserProfile] = useState<Userdata | null>(null);
    const { register, handleSubmit,formState:{errors} } = useForm<managerform>()
    
    useEffect(() => {
        if (session?.user?.token) {
            getUserProfile(session.user.token)
                .then(profile => {
                    setUserProfile(profile);
                })
                .catch(err => {
                    console.error("Error fetching user profile:", err);
                
                });
        }
    }, [session?.user?.token]);
    
    if(userProfile?.data.role !== 'admin') return null;
    

    
    const onSubmit:SubmitHandler<managerform> = async (formData) => {
        // console.log(formData)
        
        const response = await RegisterAction(formData); // server action 
    }
    return (
    <div className=" space-y-16">
        <div className="w-full pl-14">
            <p className="font-mono text-primary font-bold text-5xl">Register manager</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex items-center justify-center gap-14">
                <div className="w-[20%] space-y-4">
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Name</p>
                        <TextField className="w-[100%] font-mono" variant="outlined"
                        error={errors.name?true:false}
                        helperText={ errors.name&& "*This field is required"  }
                        {...register("name", { required: true})}
                        ></TextField>
                    </div>
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Email</p>
                        <TextField className="w-[100%] font-mono" variant="outlined" 
                        error={errors.email?true:false}
                        helperText={ errors.email&& "*This field is required"  }
                        {...register("email", { required: true})}></TextField>
                    </div>
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Password</p>
                        <TextField className="w-[100%] font-mono" variant="outlined" type="password" 
                        error={errors.password?true:false}
                        helperText={ errors.password&& "*This field is required"  }
                        {...register("password", { required: true})}></TextField>
                    </div>
                </div>
                <div className="w-[20%] space-y-4">
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Telephone</p>
                        <TextField className="w-[100%] font-mono" variant="outlined" 
                        error={errors.tel?true:false}
                        helperText={ errors.tel&& "*This field is required"  }
                        {...register("tel", { required: true})}></TextField>
                    </div>
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Confirm Email</p>
                        <TextField className="w-[100%] font-mono" variant="outlined" 
                        error={errors.c_email?true:false}
                        helperText={ errors.c_email&& "*This field is required"  }
                        {...register("c_email", { required: true})}></TextField>
                    </div>
                    <div className="space-y-2">
                        <p className="font-inter text-xs">Confirm Password</p>
                        <TextField className="w-[100%] font-mono" variant="outlined" type="password"
                        error={errors.c_password?true:false}
                        helperText={ errors.c_password&& "*This field is required"  }
                        {...register("c_password", { required: true})}></TextField>
                    </div>
                </div>
                
                
            </div>
            <div className="flex items-center justify-center mt-4">
                <button className=" w-[43%] px-8 py-2 mt-4 inline-block border p-2 text-center border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1 font-mono " style={{ fontSize: "20px" }}>
                        add manager
                </button>
            </div>
        </form>
        
    </div>
    
  )
}
