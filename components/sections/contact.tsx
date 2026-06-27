'use client';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Github, Linkedin, MapPin, Phone, Copy, Check, Instagram } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import MagneticButton from "@/components/magnetic-button";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate email sending since no backend is connected yet
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("virendraphirke2222@gmail.com");
    setCopied(true);
    toast.success("Copied!", {
      description: "Email address copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative border-t border-border bg-background">
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
            >06</motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-heading font-bold text-foreground"
            >Get In Touch</motion.h2>
            <div className="h-px bg-border flex-1 ml-4 hidden sm:block"></div>
          </div>
          <p className="text-muted-foreground text-[15px] sm:text-lg max-w-2xl">
            Currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.2 } 
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="border border-border p-3 group-hover:border-primary transition-colors bg-transparent group-hover:scale-110 duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono uppercase tracking-widest text-xs text-foreground mb-1">Email</div>
                  <div className="flex items-center gap-2">
                    <a href="mailto:virendraphirke2222@gmail.com" className="text-sm break-all">virendraphirke2222@gmail.com</a>
                    <button onClick={copyEmail} className="text-muted-foreground hover:text-primary transition-colors ml-1 p-1 rounded hover:bg-muted" aria-label="Copy email" type="button">
                      {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="border border-border p-3 group-hover:border-primary transition-colors bg-transparent group-hover:scale-110 duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono uppercase tracking-widest text-xs text-foreground mb-1">Phone</div>
                  <a href="tel:+919373099032" className="text-sm">+91 9373099032</a>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex items-start gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="border border-border p-3 group-hover:border-primary transition-colors bg-transparent group-hover:scale-110 duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono uppercase tracking-widest text-xs text-foreground mb-1">Location</div>
                  <span className="text-sm">Maharashtra, India</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-border"
            >
              <div className="font-mono uppercase tracking-widest text-xs text-foreground mb-4">Connect</div>
              <div className="flex gap-4">
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://github.com/Virendra-Phirke" target="_blank" className="border border-border p-3 hover:bg-zinc-900 transition-all bg-transparent text-muted-foreground hover:text-foreground hover:border-primary">
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" target="_blank" className="border border-border p-3 hover:bg-zinc-900 transition-all bg-transparent text-muted-foreground hover:text-foreground hover:border-primary">
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://www.instagram.com/virendra_phirke" target="_blank" className="border border-border p-3 hover:bg-zinc-900 transition-all bg-transparent text-muted-foreground hover:text-foreground hover:border-primary">
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 border border-border rounded-none p-4 sm:p-6 relative overflow-hidden group bg-transparent"
          >
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-foreground">Name</label>
                  <Input id="name" required placeholder="John Doe" className="bg-muted/50 border-border focus-visible:ring-0 focus-visible:border-primary rounded-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-foreground">Email</label>
                  <Input id="email" type="email" required placeholder="john@example.com" className="bg-muted/50 border-border focus-visible:ring-0 focus-visible:border-primary rounded-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono uppercase tracking-widest text-foreground">Subject</label>
                <Input id="subject" required placeholder="Project Inquiry" className="bg-muted/50 border-border focus-visible:ring-0 focus-visible:border-primary rounded-none" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-foreground">Message</label>
                <Textarea id="message" required placeholder="Hello Virendra..." rows={6} className="bg-muted/50 border-border focus-visible:ring-0 focus-visible:border-primary rounded-none resize-y" />
              </div>
              <div className="space-y-2 mt-4">
                <MagneticButton className="w-full">
                  <Button type="submit" className="w-full h-12 rounded-none bg-foreground text-background font-bold tracking-widest uppercase text-xs hover:bg-muted-foreground mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 w-4 h-4" />
                  </Button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
