
import getUserProfile from "@/libs/getUserProfile";
import updateUser from "@/libs/updateUser";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { TUserCustomSchema, userCustomizeSchema } from "@/utils/types";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth";


const ProfileSetting = async () => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user.token) return null;


    const profile = await getUserProfile(session.user.token);
    const profileData = profile.data as TUserCustomSchema;
    


    return (
        <ProfileForm userData={profileData} token={session.user.token}/>
    );
};

export default ProfileSetting;