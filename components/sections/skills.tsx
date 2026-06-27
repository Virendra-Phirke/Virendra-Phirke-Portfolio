'use client';
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect, useState } from "react";

function SkillBadge({ skill }: { skill: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      mouseX.set(e.clientX - x);
      mouseY.set(e.clientY - y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculate distance from center to mouse
  const distance = useTransform(() => {
    const x = mouseX.get();
    const y = mouseY.get();
    return Math.sqrt(x * x + y * y);
  });

  // Calculate scale based on distance (closer = bigger)
  const scale = useTransform(distance, [0, 150], [1.15, 1]);
  const smoothScale = useSpring(scale, { damping: 25, stiffness: 300 });

  // Glow opacity based on distance
  const glowOpacity = useTransform(distance, [0, 100], [0.3, 0]);
  const smoothGlow = useSpring(glowOpacity, { damping: 25, stiffness: 300 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10"
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        style={{
          boxShadow: useTransform(smoothGlow, (g) => `0 0 20px 2px rgba(234, 67, 53, ${g})`),
          borderColor: useTransform(smoothGlow, (g) => `rgba(234, 67, 53, ${g})`),
          borderWidth: "1px",
          borderStyle: "solid"
        }}
      />
      <Badge 
        variant="outline" 
        className={`font-mono font-normal text-xs transition-colors duration-300 rounded-none ${isHovered ? "text-foreground bg-muted" : "text-muted-foreground bg-transparent"} border-border relative z-10`}
      >
        {skill}
      </Badge>
    </motion.div>
  );
}

export default function Skills() {

  const categories = [
    {
      name: "Languages",
      color: "bg-red-600",
      skills: ["C", "Java", "Python", "JavaScript", "TypeScript", "Kotlin"],
    },
    {
      name: "Frontend",
      color: "bg-zinc-500",
      skills: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Backend",
      color: "bg-zinc-500",
      skills: ["Node.js", "Django"],
    },
    {
      name: "Database",
      color: "bg-zinc-500",
      skills: ["MySQL", "PostgreSQL", "Supabase", "PL/pgSQL"],
    },
    {
      name: "Mobile",
      color: "bg-zinc-500",
      skills: ["Capacitor", "Jetpack Compose", "Android SDK", "MapLibre"],
    },
    {
      name: "Tools & Infrastructure",
      color: "bg-zinc-500",
      skills: ["Git", "Vite", "NPM", "Vercel", "Clerk", "React Query"],
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 relative border-t border-border bg-background">
      <div className="container mx-auto px-6">
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
            >02</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >Technical Arsenal</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6, 
                    ease: [0.25, 0.25, 0, 1],
                    staggerChildren: 0.05,
                    delayChildren: 0.2
                  } 
                }
              }}
              className="border-l border-border pl-6 py-2 hover:border-l-primary transition-colors group"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
                }}
                className="flex flex-col gap-2 mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${category.color} transition-transform group-hover:scale-150`} />
                  <h3 className="font-heading font-semibold text-foreground uppercase tracking-widest text-xs">{category.name}</h3>
                </div>
                <div className="h-[1px] w-full bg-muted mt-1 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-primary"
                    variants={{
                      hidden: { width: "0%" },
                      visible: { width: "100%", transition: { duration: 1, ease: "easeOut", delay: 0.3 } }
                    }}
                  />
                </div>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
