import React from "react";
import Link from "next/link";

export default function ReserveSuccess() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-300">
      <img
        src="/checkSuccessful.svg"
        alt="Check Icon"
        className="w-100 h-100 mb-6"
      />
      <h1 className="font-bold text-4xl mb-8">Reserve Successful!</h1>
      <Link href="/myTable">
        <button className="mt-4 bg-white border-2 border-black text-black px-8 py-2 hover:bg-black hover:text-white">
          Back to your table
        </button>
      </Link>
    </div>
  );
}
