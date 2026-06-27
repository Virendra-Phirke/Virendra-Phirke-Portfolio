'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Eye, EyeOff, Moon, Sun, Github, Linkedin, Mail, X, User, Code2, FolderKanban, Briefcase, Send } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Send },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Virendra-Phirke", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/virendra-phirke", icon: Linkedin },
  { name: "Email", href: "mailto:virendraphirke@gmail.com", icon: Mail },
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
              {navLinks.map((link) => (
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
        <div className="flex items-center gap-3 md:hidden z-50 relative">
          {/* Mobile Nav Toggle — Hamburger / X */}
          <button 
            className="relative text-foreground w-10 h-10 flex items-center justify-center rounded-full border border-border/50 hover:border-foreground/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col items-center justify-center gap-[5px] w-5">
              <span className={`block w-full h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${mobileMenuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block w-full h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-full h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${mobileMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {/* ─── Mobile Sidebar ─── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Sidebar panel */}
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-screen w-[85vw] max-w-[380px] z-50 flex flex-col overflow-hidden"
                style={{
                  background: 'var(--background)',
                }}
              >
                {/* Decorative accent line at top */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[2px] w-full origin-left"
                  style={{ background: 'linear-gradient(90deg, var(--primary), transparent)' }}
                />

                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <span className="font-serif italic font-bold text-xl tracking-tighter text-foreground">
                      <span className="text-primary">Virendra</span>.dev
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1 font-mono">Navigation</p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    aria-label="Close navigation"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="mx-7 h-px bg-border" />

                {/* Nav links */}
                <nav className="flex-1 px-5 py-6 overflow-y-auto">
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((link, i) => {
                      const isActive = activeSection === link.href.substring(1);
                      const Icon = link.icon;
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{
                            delay: 0.15 + i * 0.06,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <a
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                            }`}
                          >
                            {/* Active indicator bar */}
                            {isActive && (
                              <motion.span
                                layoutId="mobile-active-indicator"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-full bg-primary"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                              />
                            )}

                            {/* Number */}
                            <span className={`text-[10px] font-mono tracking-widest min-w-[28px] transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'}`}>
                              0{i + 1}
                            </span>

                            {/* Icon */}
                            <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-foreground/80'}`} />

                            {/* Label */}
                            <span className="text-base font-heading font-semibold tracking-tight">
                              {link.name}
                            </span>

                            {/* Arrow on hover/active */}
                            <span className={`ml-auto text-xs transition-all duration-200 ${isActive ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`}>
                              →
                            </span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Bottom section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mt-auto border-t border-border px-7 py-5"
                >
                  {/* Theme & Focus toggles */}
                  <div className="flex items-center gap-3 mb-5">
                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border text-foreground/60 hover:text-foreground hover:border-foreground/20 transition-all text-xs uppercase tracking-[0.15em] font-medium flex-1 justify-center"
                        title="Toggle Theme"
                      >
                        {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                        {theme === "dark" ? "Light" : "Dark"}
                      </button>
                    )}
                    <button
                      onClick={() => setIsFocusMode(!isFocusMode)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs uppercase tracking-[0.15em] font-medium flex-1 justify-center transition-all ${
                        isFocusMode
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-foreground/60 hover:text-foreground hover:border-foreground/20"
                      }`}
                      title="Toggle Focus Mode"
                    >
                      {isFocusMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      Focus
                    </button>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3 mb-4">
                    {socialLinks.map((social) => {
                      const SocialIcon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                          title={social.name}
                        >
                          <SocialIcon className="w-3.5 h-3.5" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Copyright */}
                  <p className="text-[10px] text-muted-foreground/40 font-mono tracking-wider">
                    © {new Date().getFullYear()} Virendra Phirke
                  </p>
                </motion.div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
