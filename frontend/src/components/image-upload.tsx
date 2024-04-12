'use client'

import update from "@/app/(reservation)/reservation/[resid]/page";
import { useState, useEffect } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const ImageUpload = () =>{


    const [uploadedImage, setUploadedImage] = useState<string>("/buffet.png"); // url



    return <div className="w-full h-full">

        <Image
        src={uploadedImage}
        alt="uploaded image"
        objectFit="cover"
        width={400}
        height={400}
        />
     
        <UploadButton
        endpoint="restaurantUploader"
        onClientUploadComplete={(res) => {

          setUploadedImage(res.findLast((r) => r.url)?.url || "");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
}

export default ImageUpload;