import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end p-12 border-t border-border bg-background text-foreground">
      <div className="flex flex-col mb-8 md:mb-0">
        <div className="text-4xl font-serif italic mb-2 tracking-tight">Let&apos;s build something remarkable.</div>
        <div className="text-xs text-muted-foreground font-mono">virendraphirke2222@gmail.com &mdash; +91 9373099032</div>
      </div>
      <div className="flex gap-4">
        <a href="https://github.com/Virendra-Phirke" target="_blank" className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" target="_blank" className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" target="_blank" className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-border hover:scale-110 hover:-translate-y-1 transition-all">
          <Twitter className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
