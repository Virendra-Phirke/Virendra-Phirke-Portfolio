'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (activeSection && section.id === activeSection) {
        section.setAttribute("data-active", "true");
      } else {
        section.removeAttribute("data-active");
      }
    });
  }, [activeSection]);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    return () => document.body.classList.remove("focus-mode");
  }, [isFocusMode]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-serif italic font-bold text-2xl tracking-tighter text-foreground group">
          <span className="text-primary group-hover:opacity-80 transition-opacity">Virendra</span>.dev
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <motion.ul 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5
                  }
                }
              }}
              className="flex items-center gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                >
                  <a href={link.href} className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-primary flex items-center gap-1 ${activeSection === link.href.substring(1) ? "text-primary opacity-100" : "opacity-60 hover:opacity-100"}`}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle Desktop */}
            {mounted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            )}

            {/* Focus Toggle Desktop */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors px-4 py-2 rounded-full border ${isFocusMode ? 'border-primary text-primary bg-primary/10' : 'border-border text-foreground/60 hover:text-foreground hover:border-foreground/30'}`}
              title="Toggle Focus Mode"
            >
              {isFocusMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isFocusMode ? 'Focus On' : 'Focus Off'}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden z-50 relative">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-border text-foreground/60 hover:text-foreground transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Focus Toggle Mobile */}
          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`p-2 rounded-full border ${isFocusMode ? 'border-primary text-primary bg-primary/10' : 'border-border text-foreground/60 hover:text-foreground'}`}
            title="Toggle Focus Mode"
          >
            {isFocusMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Mobile Nav Toggle */}
          <button 
            className="text-foreground flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center pt-20 h-screen w-screen"
            >
              <ul className="flex flex-col items-center gap-10">
                <AnimatePresence>
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.name} 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <a 
                        href={link.href} 
                         onClick={() => setMobileMenuOpen(false)}
                        className="text-4xl md:text-5xl font-heading text-foreground font-black tracking-tighter uppercase transition-colors flex flex-col items-center group hover:text-primary relative"
                      >
                        <span className="text-primary/50 text-xs font-mono tracking-widest mb-2 transition-colors group-hover:text-primary" aria-hidden="true">0{i + 1}.</span> 
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
