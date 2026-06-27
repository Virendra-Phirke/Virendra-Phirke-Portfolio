'use client';
import { motion } from "motion/react";

export function SectionDivider() {
  return (
    <div className="w-full py-8 flex justify-center items-center overflow-hidden bg-background">
      <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent relative">
        <motion.div
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 h-[1px] w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />
      </div>
    </div>
  );
}
