import Image from "next/image"


export default function TableGraphics() {
  return (
    <div className="w-[60%] h-[50%] relative flex-grow hidden xl:block">
        <Image 
            src="/table.svg"
            alt="Table Picture"
            width={0} // Set the width of the image
            height={0} // Set the height of the image
            objectFit="cover"
            layout="fill"
            style={{ borderRadius: "2px" }}
        />
    </div>
  )
}
