'use client'
import getUserProfile from "@/libs/getUserProfile";
import updateUser from "@/libs/updateUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { revalidateTag } from "next/cache";
const ProfileSetting: NextPage = () => {

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');

    const {data: session} = useSession();

    const router = useRouter();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        if (session) {
            const data = await getUserProfile(session.user.token);
            setName(data.data.name);
            setEmail(data.data.email);
            setTel(data.data.tel);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        if (session) {
            const data = await getUserProfile(session.user.token);
            if (name == '') {
                setName(data.data.name);
            }
            if (tel == '') {
                setTel(data.data.tel);
            }
            if (email == '') {
                setEmail(data.data.email);
            }
            
            const response = await updateUser(name, email, tel, session.user.token);
        }
        revalidateTag('profile');
        router.push('/dashboard');
    }

    return (
        <div className="flex flex-col gap-[10%] items-start w-full pr-[17%] ml-[5%]">
            <div className="w-full inline-flex items-center space-x-4 gap-[2%]">
                <h1 className="text-xl font-medium text-left">Customize Account</h1>
                <hr className="border-zinc-900 grow" />
            </div>
            <form onSubmit={handleUpdate} className="w-full flex flex-col gap-[10%] h-full">
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    id = 'name' type="text" value={name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    id = 'email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="tel">Tel</label>
                    <input className="w-[40%] block px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
                    id = 'tel' type="tel" value={tel} onChange={(e) => setTel(e.target.value)}>
                    </input>
                </div>
                <div className="flex flex-row gap-[5%]">
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
    );
};

export default ProfileSetting;