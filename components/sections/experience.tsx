'use client';
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [283, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const timeline = [
    {
      type: "internship",
      title: "AICTE Internship — Full Stack (Django)",
      organization: "Inspire Softech, Chennai",
      date: "2024",
      desc: "Developed full-stack web applications utilizing Django. Engineered robust database schemas and optimized RESTful API designs to serve data securely and efficiently to client interfaces.",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
    },
    {
      type: "training",
      title: "Training — SQL, Core & Advanced Java",
      organization: "SEED Infotech, Pune",
      date: "2023",
      desc: "Completed comprehensive training focusing on relational database management, advanced Java engineering, and system-level object-oriented programming methodologies.",
      icon: <Award className="w-5 h-5 text-purple-400" />,
    },
    {
      type: "education",
      title: "B.E. Computer Science Engineering",
      organization: "Shri Shivaji Education Society, Akola",
      date: "2022 - 2026",
      desc: "Currently pursuing final year focusing on core system architecture, data structures, and advanced software engineering principles.",
      icon: <GraduationCap className="w-5 h-5 text-green-400" />,
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="py-16 sm:py-24 relative border-t border-border bg-background overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 inset-y-[-20%] z-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
      >
        <span className="text-[20vw] font-heading font-black whitespace-nowrap">EXPERIENCE</span>
      </motion.div>

      <div className="absolute right-4 top-0 bottom-0 w-12 hidden pointer-events-none z-10">
        <div className="sticky top-1/2 -translate-y-1/2 pt-12 flex flex-col items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 100 100" className="transform -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted-foreground" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary transition-colors" strokeDasharray="283" style={{ strokeDashoffset }} />
          </svg>
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground rotate-90 origin-left mt-8">Progress</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-muted-foreground"
            >04</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >Experience & Education</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="relative border-l border-border ml-3 sm:ml-4 md:ml-6 space-y-8 sm:space-y-12 pb-8"
        >
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -20, y: 20 },
                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, type: 'spring', bounce: 0.4 } }
              }}
              className="relative pl-6 sm:pl-8 md:pl-12 group cursor-pointer"
            >
              <div className="absolute -left-1 top-2 bg-muted group-hover:bg-primary transition-colors w-2 h-2 rounded-full">
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-foreground group-hover:italic transition-all">{item.title}</h3>
              </div>
              
              <div className="text-primary font-mono text-xs uppercase tracking-widest mb-3">{item.organization}</div>
              <motion.p 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
                }}
                className="text-sm text-muted-foreground italic leading-relaxed"
              >
                {item.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
