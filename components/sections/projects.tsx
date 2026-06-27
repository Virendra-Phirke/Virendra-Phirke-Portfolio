'use client';
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Star, X } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/magnetic-button";

type ProjectType = "All" | "Full-Stack" | "Android" | "AI / ML" | "Tools";

const projects = [
  // ... unchanged array contents ...
  {
    title: "QuizMaster",
    subtitle: "Online Examination Platform",
    featured: true,
    badges: ["⭐ Flagship", "Live SaaS"],
    desc: "Browser-based anti-cheat layer and rich teacher dashboard for creating tests. Features role-based access, fullscreen enforcement, tab-switch detection, and real-time monitoring.",
    stack: ["React.js", "Node.js", "PostgreSQL", "TypeScript", "Vercel"],
    type: "Full-Stack" as ProjectType,
    demo: "https://quizmastor.tech",
    github: "#",
    patternIndex: 1
  },
  {
    title: "CampusMate (SmartCampus)",
    subtitle: "Cross-Platform Android App",
    featured: true,
    badges: ["⭐ Flagship", "Android APK"],
    desc: "A unified digital layer for campus navigation, QR attendance, and events using Capacitor. Includes MapLibre interactive outdoor maps and Supabase real-time sync.",
    stack: ["React", "TypeScript", "Supabase", "Capacitor", "MapLibre", "Clerk"],
    type: "Android" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    demo: "#",
    patternIndex: 2
  },
  {
    title: "STREAM_X",
    subtitle: "Modern Android Media Player",
    featured: false,
    badges: ["Android Native"],
    desc: "A fully-featured Android media player built with Kotlin and Jetpack Compose that scans, manages, and plays video and audio files from device storage.",
    stack: ["Kotlin", "Jetpack Compose", "Android SDK", "Media3"],
    type: "Android" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 3
  },
  {
    title: "AI Gallery",
    subtitle: "React Photo Gallery with Gemini",
    featured: false,
    badges: ["AI Powered"],
    desc: "Photo gallery web application that uses Google Gemini API to provide AI-powered image understanding, search, and captioning capabilities.",
    stack: ["React", "TypeScript", "Gemini API", "Vite"],
    type: "AI / ML" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 4
  },
  {
    title: "Farmer Connect",
    subtitle: "Agricultural Marketplace Platform",
    featured: false,
    badges: ["Social Impact", "Web App"],
    desc: "A full-stack platform to connect farmers with buyers for direct market access without middlemen. Features product listings and negotiations.",
    stack: ["TypeScript", "Supabase", "PostgreSQL", "React"],
    type: "Full-Stack" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 5
  },
  {
    title: "PDF Page Arranger",
    subtitle: "Browser-Based Layout Tool",
    featured: false,
    badges: ["Productivity Tool", "Web App"],
    desc: "React application for rearranging PDF pages into custom print layouts entirely in the browser without a server using PDF.js.",
    stack: ["React", "TypeScript", "Vite", "PDF.js"],
    type: "Tools" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 1
  },
  {
    title: "TypeRush",
    subtitle: "Typing Speed & Accuracy Game",
    featured: false,
    badges: ["Web App"],
    desc: "Interactive typing speed test game built with Next.js analyzing WPM and accuracy in real time.",
    stack: ["Next.js", "TypeScript", "CSS"],
    type: "Full-Stack" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 2
  },
  {
    title: "AI Voice Chat Bot",
    subtitle: "Browser AI Assistant",
    featured: false,
    badges: ["AI Powered", "Web App"],
    desc: "Web-based AI voice assistant powered by Google Gemini 1.5 Flash with real-time chat UI and text-to-speech output using Web Speech API.",
    stack: ["JavaScript", "Gemini 1.5 Flash", "Web Speech API"],
    type: "AI / ML" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 3
  },
  {
    title: "Drawing App",
    subtitle: "Canvas-Based Web Drawing Tool",
    featured: false,
    badges: ["Web App"],
    desc: "Browser-based freehand drawing application utilizing the HTML5 Canvas API with brush color and size adjustments.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS"],
    type: "Tools" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 4
  },
  {
    title: "Weather Forecast",
    subtitle: "Real-Time Weather App",
    featured: false,
    badges: ["Web App"],
    desc: "Weather application fetching current and forecast data from OpenWeather API demonstrating REST consumption and responsive design.",
    stack: ["JavaScript", "HTML", "CSS", "OpenWeather API"],
    type: "Full-Stack" as ProjectType,
    github: "https://github.com/Virendra-Phirke",
    patternIndex: 5
  }
];

function TiltCard({ children, project, idx, setSelectedProject }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`card-${project.title}`}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ duration: 0.4, delay: idx * 0.1, type: "spring", bounce: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full perspective-1000"
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectType>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.type === filter
  );

  return (
    <section id="projects" ref={containerRef} className="py-16 sm:py-24 relative border-t border-border/50 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 inset-y-[-20%] z-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
      >
        <span className="text-[20vw] font-heading font-black whitespace-nowrap">PROJECTS</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-muted-foreground"
            >03</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >Featured Work</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
        </motion.div>

        <Tabs defaultValue="All" className="mb-8 sm:mb-12" onValueChange={(v) => setFilter(v as ProjectType)}>
          <TabsList className="bg-transparent border border-border h-auto p-1 rounded-none justify-start flex overflow-x-auto no-scrollbar gap-0.5">
            {["All", "Full-Stack", "Android", "AI / ML", "Tools"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] sm:text-xs uppercase tracking-widest py-2 px-3 sm:px-4 shadow-none">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <TiltCard key={project.title} project={project} idx={idx} setSelectedProject={setSelectedProject}>
                <Card 
                  onClick={() => setSelectedProject(project)}
                  className="h-full flex flex-col relative rounded-none border border-border bg-transparent pl-4 sm:pl-6 py-4 cursor-pointer overflow-hidden group hover:border-primary hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-300 transform-gpu"
                >
                  {project.featured && (
                    <span className="absolute left-0 top-6 w-1 h-8 bg-primary z-10 transition-all duration-300 group-hover:h-full group-hover:top-0 group-hover:opacity-10 group-hover:w-full"></span>
                  )}
                  <CardHeader className="p-0 pb-4 relative z-10">
                    <div className="flex justify-between items-start gap-4 mb-2 flex-col">
                      <div>
                        <h3 className="text-xs font-mono text-muted-foreground mb-1">{(idx + 1).toString().padStart(2, '0')} / {project.subtitle}</h3>
                        <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight group-hover:italic transition-all flex items-center gap-2">
                          {project.title}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.badges.map((badge) => {
                        return (
                          <span key={badge} className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm border border-border text-muted-foreground">
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 pb-4 relative z-10">
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic leading-relaxed">
                      {project.desc}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4 p-0 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[9px] sm:text-[10px] font-mono text-muted-foreground/80 bg-muted px-2 py-1 rounded-none border border-border uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 w-full">
                      {project.github && project.github !== "#" && (
                        <a href={project.github} target="_blank" className="bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest w-full py-3">
                          <Github className="w-4 h-4" /> View Source
                        </a>
                      )}
                      {project.demo && project.demo !== "#" && (
                        <a href={project.demo} target="_blank" className="border border-border bg-background text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest w-full py-3">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              layoutId={`card-${selectedProject.title}`}
              className="relative w-full max-w-2xl bg-background border border-border text-foreground overflow-hidden z-[101] shadow-2xl"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="flex flex-col relative max-h-[50vh] overflow-y-auto w-full styled-scrollbar">
                <div className="p-5 sm:p-8 pb-0">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{selectedProject.type}</span>
                      {selectedProject.featured && <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20">Featured</span>}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 pr-12">{selectedProject.title}</h2>
                    <p className="text-base sm:text-lg text-muted-foreground italic">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  <div className="space-y-8 mb-8">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="w-4 h-px bg-muted-foreground"></span>
                        Overview
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                        {selectedProject.desc}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="w-4 h-px bg-muted-foreground"></span>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech) => (
                          <span key={tech} className="text-[10px] sm:text-xs font-mono text-muted-foreground/80 bg-muted px-3 py-1.5 border border-border uppercase tracking-widest rounded-none">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-5 sm:p-8 border-t border-border shrink-0 mt-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <MagneticButton className="flex-1 w-full flex">
                        <a href={selectedProject.github} target="_blank" className="flex-1 bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest py-4 hover:-translate-y-1 w-full">
                          <Github className="w-4 h-4" /> View Source
                        </a>
                      </MagneticButton>
                    )}
                    {selectedProject.demo && selectedProject.demo !== "#" && (
                      <MagneticButton className="flex-1 w-full flex">
                        <a href={selectedProject.demo} target="_blank" className="flex-1 border border-border bg-background text-foreground hover:bg-muted transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest py-4 hover:-translate-y-1 w-full">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
