import { authOptions } from "@/components/auth";
import FormSection from "@/components/managerDashboard/FormSection";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function createRestaurantPage(){

    const session = await getServerSession(authOptions);

    if(!session || !session.user.token) return redirect('/login');
    
    const profile  = await getUserProfile(session?.user.token);

    if(profile.data.role === "user") return redirect('/login');

    return (
        <div className="w-[88%] h-full text-black">
            <FormSection/>
        </div>
    );
    
};