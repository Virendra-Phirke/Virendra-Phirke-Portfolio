'use client';
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Code2, Star, Github } from "lucide-react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

import { Badge } from "@/components/ui/badge";

interface Stats {
  repos: number;
  stars: number;
  languages: { name: string; count: number }[];
  loading: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: 'bg-[#f1e05a] text-black',
  TypeScript: 'bg-[#3178c6] text-white',
  HTML: 'bg-[#e34c26] text-white',
  CSS: 'bg-[#563d7c] text-white',
  Python: 'bg-[#3572A5] text-white',
  Java: 'bg-[#b07219] text-white',
  Kotlin: 'bg-[#A97BFF] text-white',
  Swift: 'bg-[#F05138] text-white',
  Go: 'bg-[#00ADD8] text-white',
  Ruby: 'bg-[#701516] text-white',
  PHP: 'bg-[#4F5D95] text-white',
  C: 'bg-[#555555] text-white',
  'C++': 'bg-[#f34b7d] text-white',
  'C#': 'bg-[#178600] text-white',
  Dart: 'bg-[#00B4AB] text-white',
  Rust: 'bg-[#dea584] text-black',
  Shell: 'bg-[#89e051] text-black',
};

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', bounce: 0.4 } }
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`p-6 border border-border bg-muted/30 group relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.05), transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
}

export default function GithubStats() {
  const [stats, setStats] = useState<Stats>({
    repos: 0,
    stars: 0,
    languages: [],
    loading: true
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('https://api.github.com/users/Virendra-Phirke/repos?per_page=100');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        
        let totalStars = 0;
        const langMap: Record<string, number> = {};
        
        data.forEach((repo: any) => {
          if (!repo.fork) {
            totalStars += repo.stargazers_count;
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          }
        });

        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, count]) => ({ name, count }));

        setStats({
          repos: data.filter((r: any) => !r.fork).length,
          stars: totalStars,
          languages: topLanguages,
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch Github stats", error);
        setStats(s => ({ ...s, loading: false }));
      }
    }
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Public Repositories",
      value: stats.loading ? "..." : stats.repos,
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      desc: "Authored & Maintained"
    },
    {
      title: "Top Languages",
      value: stats.loading ? "..." : (stats.languages.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {stats.languages.map(l => (
            <Badge key={l.name} variant="secondary" className={`font-mono text-[10px] uppercase tracking-wider border-none not-italic ${LANGUAGE_COLORS[l.name] || 'bg-zinc-700 text-white'}`}>
              {l.name}
            </Badge>
          ))}
        </div>
      ) : "N/A"),
      icon: <Code2 className="w-5 h-5 text-muted-foreground" />,
      desc: "Most used in repos"
    },
    {
      title: "Total Stars",
      value: stats.loading ? "..." : (stats.stars > 0 ? stats.stars : "0"),
      icon: <Star className="w-5 h-5 text-muted-foreground" />,
      desc: "Across all repositories"
    }
  ];

  return (
    <section id="github-stats" className="py-16 sm:py-24 border-t border-border bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
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
            >05</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >Open Source</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl text-[15px] sm:text-lg mb-6 sm:mb-8">
            I believe in building publicly and contributing to the developer ecosystem. Here is a snapshot of my activity on GitHub.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {cards.map((card, idx) => (
            <SpotlightCard key={idx}>
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-500 z-0">
                <Github className="w-24 h-24 text-muted-foreground" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 border border-border rounded-none bg-background group-hover:border-border transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{card.title}</h3>
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-bold group-hover:italic transition-all">
                  {card.value}
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/60 italic uppercase tracking-wider relative z-10">{card.desc}</p>
            </SpotlightCard>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-10 border border-border bg-muted/30 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5 sm:mb-8 text-left w-full max-w-[850px]">Contributions Calendar</h3>
          <div className="w-full max-w-[850px] overflow-x-auto pb-2 sm:pb-4 flex justify-start md:justify-center -mx-2 px-2">
            <GitHubCalendar 
              username="Virendra-Phirke" 
              colorScheme="dark"
              blockSize={10}
              blockMargin={3}
              fontSize={11}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
