'use client';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const RESUME_PATH = '/Virendra_Phirke_Resume.pdf';
const RESUME_FILENAME = 'Virendra_Phirke_Resume.pdf';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Lock body scroll, Escape key, and manage PDF loading state
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPdfReady(false);
      return;
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Small delay to let the modal animation start before loading PDF
    const timer = setTimeout(() => setPdfReady(true), 150);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full h-full sm:w-[90vw] sm:h-[90vh] bg-card border-0 sm:border border-border shadow-2xl flex flex-col overflow-hidden"
            style={{ zIndex: 10000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-muted/50 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Resume
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline">
                  {RESUME_FILENAME}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Download */}
                <a
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close resume viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer — uses <embed> which renders without the sidebar */}
            <div className="flex-1 bg-muted/30 overflow-hidden relative">
              {pdfReady ? (
                <embed
                  src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&pagemode=none`}
                  type="application/pdf"
                  className="w-full h-full"
                  title="Resume PDF Viewer"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      Loading resume...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center px-4 sm:px-6 py-2 border-t border-border bg-muted/50 shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                Press Esc to close · Click download to save
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
