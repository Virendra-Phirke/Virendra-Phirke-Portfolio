import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end px-6 py-8 sm:p-12 border-t border-border bg-background text-foreground gap-6 md:gap-0">
      <div className="flex flex-col mb-0 md:mb-0">
        <div className="text-2xl sm:text-4xl font-serif italic mb-2 tracking-tight">Let&apos;s build something remarkable.</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground font-mono">virendraphirke2222@gmail.com &mdash; +91 9373099032</div>
      </div>
      <div className="flex gap-3 sm:gap-4">
        <a href="https://github.com/Virendra-Phirke" target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a href="#" target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a href="#" target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </footer>
  );
}
