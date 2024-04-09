import { createContext } from 'react';
import { motion } from 'framer-motion';

const marqueeVariants = {
  animate: {
    x: [1100, -1440],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,
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
      Software Development Practice II: Project#5: Restaurant Reservation (I cut my hair)  Software Development Practice II: Project#5: Restaurant Reservation (I cut my hair)
      </p>
    </motion.div>
    </div>
  );
};

export default Marquee;
