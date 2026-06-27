'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagneticButton from "@/components/magnetic-button";
import ResumeViewer from "@/components/resume-viewer";

const roles = ['Full-Stack Developer', 'Android Enthusiast', 'Open Source Contributor'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === '') {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(role.substring(0, currentText.length - 1));
        }, 50);
      }
    } else {
      if (currentText === role) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(role.substring(0, currentText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <>
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background glow with Parallax */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 max-w-3xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm font-mono text-primary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>Open to Opportunities</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[12vw] sm:text-[60px] md:text-[100px] lg:text-[120px] leading-[0.9] md:leading-[0.8] font-heading font-black tracking-tighter uppercase mb-4 text-foreground break-words">
              Hello, I&apos;m<br/> 
              <motion.span 
                className="text-primary italic inline-flex"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } }
                }}
              >
                {"Virendra_".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: { type: "spring", damping: 12, stiffness: 200 } 
                      }
                    }}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.1, 
                      color: "hsl(var(--primary))", 
                      textShadow: "0 0 20px rgba(234, 67, 53, 0.5)",
                      transition: { type: "spring", stiffness: 400, damping: 10 } 
                    }}
                    className="inline-block cursor-default"
                  >
                    {char === "_" ? <span className="animate-pulse">{char}</span> : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Typewriter effect simulation */}
            <motion.div variants={itemVariants} className="mb-6 mt-6 min-h-8 text-xl md:text-2xl text-muted-foreground font-mono uppercase tracking-widest">
                {currentText}<span className="inline-block w-2 sm:w-3 h-5 sm:h-6 bg-primary ml-1 animate-pulse align-middle" />
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              I build highly scalable web apps, production-grade Android applications, and AI-powered tools. Transforming complex problems into elegant, code-native solutions.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <MagneticButton>
                <a href="#projects" className="bg-foreground text-background px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-muted-foreground transition-colors text-center inline-block w-full sm:w-auto">
                  View Projects
                </a>
              </MagneticButton>
              <MagneticButton>
                <button onClick={() => setIsResumeOpen(true)} className="border border-border bg-background/50 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer hover:border-muted-foreground transition-colors flex items-center justify-center w-full sm:w-auto">
                  <FileText className="mr-2 h-4 w-4" /> View Resume
                </button>
              </MagneticButton>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-6 text-muted-foreground"
            >
              <a href="https://github.com/Virendra-Phirke" target="_blank" className="hover:text-[#2dba4e] transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:virendraphirke2222@gmail.com" className="hover:text-[#ea4335] transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4 hidden lg:flex justify-center items-center"
          >
             <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-64 h-64 md:w-80 md:h-80"
             >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-50" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-muted/50 flex items-center justify-center shadow-2xl backdrop-blur-sm -rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 group">
                  <Image
                    src="https://github.com/virendra-phirke.png"
                    alt="Virendra Phirke"
                    fill
                    priority
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none mix-blend-multiply" />
                </div>
             </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
         <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-muted-foreground z-10">Scroll To Explore</span>
         <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
         >
            <ChevronDown className="w-5 h-5 text-muted-foreground z-20 opacity-70" />
         </motion.div>
      </motion.div>
    </section>

    <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
