import Marquee from "./marquee";
import { UserItem } from "../../interface";
import Link from "next/link";

export default function TopBar({
  userName,
  role,
}: {
  userName: string;
  role: string;
}) {
  return (
    <nav data-testid="top-bar" className="text-base flex flex-row z-30 p-9">
      <div className="w-[85%] mr-4 flex items-center bg-stone-800">
        <Marquee />
      </div>
      <div className="w-[15%] flex items-center z-40 bg-stone-800">
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
