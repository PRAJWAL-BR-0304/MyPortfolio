
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { resumeData } from '@/data/resume';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { GA_TRACKING_ID } from '@/lib/gtag';
import Script from 'next/script';
import AiChat from '@/components/ai-chat';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteUrl = `https://${resumeData.contact.website}`;
const siteTitle = `Portfolio | ${resumeData.name} - ${resumeData.title}`;
const siteDescription = resumeData.summary;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${resumeData.name} Portfolio`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: `${resumeData.name} Portfolio`,
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: `${resumeData.name} Portfolio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['https://placehold.co/1200x630.png'],
  },
   robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.name,
    url: siteUrl,
    sameAs: [
      `https://${resumeData.contact.linkedin}`,
      `https://${resumeData.contact.github}`,
    ],
    jobTitle: resumeData.title,
    email: resumeData.contact.email,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={cn("font-body antialiased", inter.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={['light', 'dark', 'rose', 'stone']}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AiChat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
