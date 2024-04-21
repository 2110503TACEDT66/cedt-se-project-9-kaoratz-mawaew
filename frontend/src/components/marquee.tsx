'use client';

import { motion } from "framer-motion";

const marqueeVariants = {
  animate: {
    x: [1100, -1440],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 12,
        ease: "linear",
      },
    },
  },
};

const Marquee = () => {
  return (
    <div className="marquee-container w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        <p className=" text-stone-100">
          "Then: ensure manager can see all restaurants under management
          In the top of manager's dashboard there will be
          --Show Restaurant Name and Average rating--

          Section 1
          [Calculate from all restaurants under management]
          1. Number of current reservations
          2. Number of reservations this year (2024)
          3. Number of reservations throughout usage

          Section 2
          [Card of each restaurant under management]
          There are buttons for summarizing information and buttons for editing information of restaurant.

          [In each summary]
          - Infomation of this restaurant (Operation hour, Map)-
          1. Number of current reservations
          2. Number of reservations this year (2024)
          3. Number of reservations throughout usage
          4. Booking history and upcoming reservation in the form of a table (Date reserve, Restaurant Name, Booking date , Status)
          5. Peak hours graph
          6. Comment history in card form

          Manager also can customize  e.g. edit name,edit email edit phone number."
        </p>
      </motion.div>
    </div>
  );
};

export default Marquee;
