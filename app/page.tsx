'use client';
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import GithubStats from "@/components/sections/github-stats";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { SectionDivider } from "@/components/ui/section-divider";

const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 w-full flex flex-col items-center"
      >
        <div className="w-full max-w-7xl">
          <SectionReveal>
            <Hero />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <About />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <Skills />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <Projects />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <Experience />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <GithubStats />
          </SectionReveal>
          <SectionDivider />
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
