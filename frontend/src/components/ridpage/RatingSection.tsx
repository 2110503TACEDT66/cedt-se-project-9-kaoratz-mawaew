import getReviews from "@/libs/getReviews"
import { ReviewJson } from "../../../interface"
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import { ProgressBar } from '@tremor/react';


export default async function RatingSection({
  reviews
}: {
  reviews: Promise<ReviewJson>
}) {

  const reviewJson = await reviews;
  const reviewData = reviewJson.data;
  let reviewTotal = 0;
  const reviewsStat = [0, 0, 0, 0, 0];

  reviewData.map((review) => {
    reviewsStat[review.rating - 1] += 1;
    reviewTotal += review.rating;
  });

  const averageRating = (Math.round((reviewTotal / reviewJson.count) * 10) / 10).toFixed(1);




  // console.log(reviewsStat, averageRating);
  return (
    <>
      <div className="flex flex-col justify-center gap-2 items-center md:flex-row justify-self-center self-start ">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col">
            <div className="text-[70px]">
              {averageRating}
            </div>
            <div className="text-2xl">
              {`${reviewJson.count} Reviews`}
            </div>
          </div>
          <div>
            <StarIcon sx={{ fontSize: 150 }} />
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <div className="flex flex-row gap-2 w-[300px] justify-center items-center">
            <Rating name="read-only" value={5} readOnly size="medium" style={{ color: 'black' }} />
            <ProgressBar value={(reviewsStat[4] / reviewJson.count) * 100} color="zinc" />
          </div>
          <div className="flex flex-row gap-2 w-[300px] justify-center items-center">
            <Rating name="read-only" value={4} readOnly size="medium" style={{ color: 'black' }} />
            <ProgressBar value={(reviewsStat[3] / reviewJson.count) * 100} color="zinc" />
          </div>
          <div className="flex flex-row gap-2 w-[300px] justify-center items-center">
            <Rating name="read-only" value={3} readOnly size="medium" style={{ color: 'black' }} />
            <ProgressBar value={(reviewsStat[2] / reviewJson.count) * 100} color="zinc" />
          </div>
          <div className="flex flex-row gap-2 w-[300px] justify-center items-center">
            <Rating name="read-only" value={2} readOnly size="medium" style={{ color: 'black' }} />
            <ProgressBar value={(reviewsStat[1] / reviewJson.count) * 100} color="zinc" />
          </div>
          <div className="flex flex-row gap-2 w-[300px] justify-center items-center">
            <Rating name="read-only" value={1} readOnly size="medium" style={{ color: 'black' }} />
            <ProgressBar value={(reviewsStat[0] / reviewJson.count) * 100} color="zinc" />
          </div>
        </div>
      </div>
    </>
  )
}
