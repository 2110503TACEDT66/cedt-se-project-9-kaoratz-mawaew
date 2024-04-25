"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/legacy/image";
import { Button, CircularProgress } from "@mui/material";

const ImageUpload = ({
  setImageUrl,
  imageUrl,
}: {
  setImageUrl: (url: string) => void;
  imageUrl: string | null;
}) => {
  const [uploadedImage, setUploadedImage] = useState<string>(imageUrl || ""); // url

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   if (uploadedImage) {
  //     setImageUrl(uploadedImage);
  //     setIsLoading(true);
  //   }
  // }, [uploadedImage]);

  const handleImageLoad = () => {
    // setIsLoading(false);
  };

  return (
    <div className="w-full h-full">
      {uploadedImage ? (
        <>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-[70%] h-full relative">
              {isLoading && (
                <div className="w-full h-full bg-gray-300 animate-pulse flex justify-center items-center">
                  <CircularProgress color="inherit" />
                </div>
              )}
              <Image
                src={uploadedImage}
                alt="uploaded image"
                layout="fill"
                objectFit="cover"
                
                onLoad={handleImageLoad}
                style={{ borderRadius: "5px" }}
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
            >
              delete image
            </Button>
          </div>
        </>
      ) : (
        <UploadDropzone
          className="border-primary border-2 ut-label:text-lg ut-label:text-primary ut-button:bg-primary hover:cursor-pointer ut-button:text-white hover:scale-[101%] 
          transition-all ut-uploading:ut
          ut-allowed-content:ut-uploading:text-white"
          endpoint="restaurantUploader"
          onClientUploadComplete={(res: any[]) => {
            setIsLoading(true);
            setUploadedImage(res.findLast((r) => r.url)?.url || "");
            setImageUrl(res.findLast((r) => r.url)?.url || "");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
