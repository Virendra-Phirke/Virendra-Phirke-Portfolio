import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import BackgroundGrid from "@/components/background-grid";
import ScrollToTop from "@/components/scroll-to-top";
import CustomCursor from "@/components/custom-cursor";
import AmbientAudio from "@/components/ambient-audio";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Virendra Phirke — Full-Stack Developer | React · Node.js · TypeScript',
  description: 'Full-stack developer from Maharashtra, India. Built QuizMaster (live SaaS), CampusMate (Android), and 10+ projects.',
  openGraph: {
    title: 'Virendra Phirke — Full-Stack Developer',
    description: 'Full-stack developer from Maharashtra, India. Transforming complex problems into elegant, code-native solutions.',
    url: 'https://virendraphirke.com',
    siteName: 'Virendra Phirke Portfolio',
    images: [
      {
        url: 'https://github.com/virendra-phirke.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virendra Phirke — Full-Stack Developer',
    description: 'Full-stack developer from Maharashtra, India. Transforming complex problems into elegant, code-native solutions.',
    images: ['https://github.com/virendra-phirke.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable, jetbrainsMono.variable, playfairDisplay.variable)} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden max-w-[100vw]" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundGrid />
          <CustomCursor />
          <AmbientAudio />
          {children}
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
