'use client';
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Code2, Server, Smartphone, Shield } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [283, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const stats = [
    { label: "Projects", value: "10+" },
    { label: "Internships", value: "2" },
    { label: "Live SaaS", value: "1" },
    { label: "Repos", value: "13" },
  ];

  const interests = [
    { icon: <Shield className="w-4 h-4" />, text: "Cybersecurity" },
    { icon: <Server className="w-4 h-4" />, text: "System Design" },
    { icon: <Code2 className="w-4 h-4" />, text: "Open Source" },
    { icon: <Smartphone className="w-4 h-4" />, text: "Android" },
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative border-t border-border/50 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 inset-y-[-20%] z-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
      >
        <span className="text-[20vw] font-heading font-black whitespace-nowrap">ABOUT</span>
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm text-muted-foreground"
            >01</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >About Me</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="space-y-6 relative border-l border-border/50 pl-6 lg:pl-10 ml-2"
          >
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] } }
              }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              I am a software developer based in Akola, Maharashtra. I specialize in building end-to-end products—from designing secure architectures to crafting responsive frontends.
            </motion.p>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] } }
              }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              My journey started with a fascination for how systems work under the hood. Since then, I&apos;ve shipped a live EdTech SaaS, developed cross-platform Android applications, and explored AI-integrated web tooling. I view code not just as logic, but as a medium to solve real-world problems.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] } }
              }}
              className="mt-8 pt-6 border-t border-border"
            >
               <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Core Technologies</h4>
               <motion.div 
                 variants={{
                   hidden: {},
                   visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
                 }}
                 className="flex flex-wrap gap-2"
               >
                  {[
                     { name: 'TypeScript', color: 'hover:text-[#3178c6] hover:border-[#3178c6]/50 hover:bg-[#3178c6]/10' },
                     { name: 'React', color: 'hover:text-[#61dafb] hover:border-[#61dafb]/50 hover:bg-[#61dafb]/10' },
                     { name: 'Next.js', color: 'hover:text-white hover:border-white/50 hover:bg-white/10' },
                     { name: 'Node.js', color: 'hover:text-[#339933] hover:border-[#339933]/50 hover:bg-[#339933]/10' },
                     { name: 'Kotlin', color: 'hover:text-[#7f52ff] hover:border-[#7f52ff]/50 hover:bg-[#7f52ff]/10' },
                     { name: 'PostgreSQL', color: 'hover:text-[#336791] hover:border-[#336791]/50 hover:bg-[#336791]/10' },
                     { name: 'Python', color: 'hover:text-[#3776AB] hover:border-[#3776AB]/50 hover:bg-[#3776AB]/10' },
                  ].map((tech) => (
                     <motion.span 
                        key={tech.name} 
                        variants={{
                           hidden: { opacity: 0, scale: 0.8 },
                           visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                        }}
                        className={`text-xs font-mono border border-border bg-muted/50 px-3 py-1 text-muted-foreground transition-all duration-300 cursor-default ${tech.color}`}
                     >
                        {tech.name}
                     </motion.span>
                  ))}
               </motion.div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] } }
              }}
              className="flex items-center gap-2 mt-8 pt-6 border-t border-border"
            >
              <span className="text-2xl">🇮🇳</span>
              <span className="text-muted-foreground font-medium">Maharashtra, India</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-border bg-muted/50 rounded-none p-8"
          >
            <h3 className="font-heading text-xl font-semibold mb-6 uppercase tracking-widest text-xs">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="space-y-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold font-heading text-primary">{stat.value}</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <h3 className="font-heading font-semibold mb-4 pt-6 border-t border-border uppercase tracking-widest text-xs">Core Interests</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
                  className="flex items-center gap-2 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase cursor-default"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
