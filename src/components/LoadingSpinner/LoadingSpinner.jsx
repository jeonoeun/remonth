import React from "react";
import { motion } from "framer-motion";
import "./LoadingSpinner.scss";

const spinTransition = {
  repeat: Infinity,
  repeatType: "loop",
  ease: "linear",
  duration: 1,
};

export default function CircleLoader() {
  return (
    <div className="circle-loader">
      <motion.span
        className="circle"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
