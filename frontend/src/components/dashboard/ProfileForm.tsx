'use client';

import { useForm } from "react-hook-form";
import { TUserCustomSchema, userCustomizeSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProfileFormAction from "./ProfileFormAction";


export default function ProfileForm({
    userData,
    token
}: {
    userData: TUserCustomSchema
    token: string
}) {


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        
    } = useForm(
        {
            resolver: zodResolver(userCustomizeSchema),
            defaultValues: {
                name: userData.name || "username",
                email: userData.email || "email",
                tel: userData.tel || "tel"
            }
        }
    );

    
    const onSubmit = async (data: TUserCustomSchema) => {
        await ProfileFormAction(data, token);
    };


    return (
        <div className="flex flex-col gap-[10%] items-start w-full h-[80vh] pr-[17%] ml-[5%] relative">
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left">Customize Account</h1>
                <hr className="border-zinc-900 grow" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[10%] h-full">
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100
                     text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        {...register("name")} />
                    {errors.name?.message && <p>{errors.name?.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        {...register("email")} />
                    {errors.email?.message && <p>{errors.email?.message}</p>}
                </div>
                <div>
                    <label htmlFor="tel">Tel</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        {...register("tel")}
                    />
                    {errors.tel?.message && <p>{errors.tel?.message}</p>}
                </div>
                <div className="flex flex-row gap-[5%] absolute bottom-0 w-full">
                    <Link href={'/dashboard'} className="w-[20%]">
                        <button className="w-full pr-8 pl-7 py-2 text-center bg-stone-100 text-stone-800 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 hover:bg-stone-800 hover:text-stone-100">
                            &lt;- Back
                        </button>
                    </Link>
                    <button className="w-[75%] px-8 py-2 text-center bg-stone-100 text-stone-800 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 hover:bg-stone-800 hover:text-stone-100"
                        type="submit">
                        Confirm
                    </button>
                </div>

            </form>

        </div>

    )
}
