import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReceiptSnap AI — Stop Overpaying Taxes on Your Contractor Income",
  description: "AI-powered receipt tracking for self-employed contractors, freelancers, and gig workers. Snap photos, auto-categorize for taxes, export tax-ready spreadsheets. Join the waitlist for early access.",
  keywords: ["receipt tracker", "self-employed tax deductions", "contractor expense tracking", "AI receipt scanner", "Schedule C expenses"],
  openGraph: {
    title: "ReceiptSnap AI — Stop Overpaying Taxes",
    description: "Self-employed? Stop losing $1,200+ in tax deductions. AI-powered receipt tracking that actually works.",
    type: "website",
    url: "https://receiptsnap.ai",
    siteName: "ReceiptSnap AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReceiptSnap AI — Stop Overpaying Taxes",
    description: "Self-employed? Stop losing $1,200+ in tax deductions. AI-powered receipt tracking that actually works.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ReceiptSnap AI",
              description: "AI-powered receipt tracking for self-employed professionals",
              url: "https://receiptsnap.ai",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How accurate is the AI at reading receipts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The AI is designed to achieve 95%+ accuracy on standard printed receipts. You can manually correct any errors, and the system learns from your corrections.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does ReceiptSnap launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're in early access now with a full public launch planned for Q1 2026. Join the waitlist for immediate early access.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my data secure?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We use 256-bit encryption, store data on SOC 2 compliant infrastructure, and never access your bank accounts.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="348f08f5-0213-4c55-b0fe-b97dc424b276" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}