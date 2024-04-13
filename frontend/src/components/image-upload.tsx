'use client'

import update from "@/app/(reservation)/reservation/[resid]/page";
import { useState, useEffect, Suspense } from "react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Button, CircularProgress } from "@mui/material";

const ImageUpload = () => {


  const [uploadedImage, setUploadedImage] = useState<string>(""); // url

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedImage) {
      setIsLoading(true);
    }
  }, [uploadedImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };




  return (
    <div className="w-full h-full">

      {
        uploadedImage ?
          <>
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-[70%] h-full relative">
                {isLoading && <div className="w-full h-full bg-gray-300 animate-pulse flex justify-center items-center">
                  {/* <svg className="w-10 h-10 text-gray-200 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg> */}
                  <CircularProgress color="inherit" />
                </div>}
                <Image
                  src={uploadedImage}
                  alt="uploaded image"
                  layout="fill"
                  objectFit="cover"
                  onLoad={handleImageLoad}
                  style={{ borderRadius: '5px' }}
                />
              </div>
            </div>
              <div className="flex justify-center mt-5">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={(e) => {
                    setUploadedImage("");
                  }}
                >delete image</Button>
              </div>
          </>

          :
          
          <UploadDropzone
            className="border-primary border-2 ut-label:text-lg ut-label:text-primary ut-button:bg-primary hover:cursor-pointer ut-button:text-white hover:scale-[101%] 
          transition-all ut-uploading:ut
          ut-allowed-content:ut-uploading:text-white"
            endpoint="restaurantUploader"
            onClientUploadComplete={(res) => {

              setUploadedImage(res.findLast((r) => r.url)?.url || "");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);

            }} />
      }

    </div>
  );
}

export default ImageUpload;