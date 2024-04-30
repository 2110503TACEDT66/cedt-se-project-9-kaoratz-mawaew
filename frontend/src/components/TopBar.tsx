import Marquee from "./marquee";
import Link from "next/link";

export default function TopBar({
  userName,
  role,
}: {
  userName: string;
  role: string;
}) {
  return (
    <nav data-testid="top-bar" className="text-base flex flex-row p-9 h-[10%]">
      <div className="w-[85%] mr-4 flex items-center bg-primary">
        <Marquee />
      </div>
      <div className="w-[15%] flex items-center z-20 bg-primary overflow-hidden transition-transform duration-300 ease-in-out 
                        hover:shadow-lg hover:shadow-stone-500/100 hover:bg-stone-800 hover:text-stone-100 transform 
                        hover:-translate-x-1 hover:-translate-y-1">
        <Link href="/dashboard">
          <p className="pl-2 pr-2 pt-1 pb-1 text-stone-100">
            <span className="hidden sm:inline">{`${userName} ${role}`}</span>
            <span className="sm:hidden sm:content-center">Menu</span>
          </p>
        </Link>
      </div>
    </nav>
  );
}
