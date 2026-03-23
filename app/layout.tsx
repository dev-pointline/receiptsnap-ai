import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReceiptSnap AI — Stop Overpaying Taxes on Your Contractor Income",
  description: "AI-powered receipt tracking for self-employed professionals. Snap receipts, auto-categorize for taxes, export spreadsheets. Join the waitlist for early access.",
  openGraph: {
    title: "ReceiptSnap AI — Stop Overpaying Taxes",
    description: "AI-powered receipt tracking for contractors, freelancers & gig workers. Snap, categorize, export. Join the waitlist.",
    type: "website",
    locale: "en_US",
    siteName: "ReceiptSnap AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReceiptSnap AI — Stop Overpaying Taxes",
    description: "AI-powered receipt tracking for self-employed professionals. Join the waitlist for early access.",
  },
  keywords: ["receipt tracker", "expense tracking", "self-employed taxes", "contractor deductions", "AI receipt scanner"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
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
                  name: "How accurate is the AI categorization?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our AI is designed to achieve 95%+ accuracy on common expense categories. You can always review and adjust any category before exporting."
                  }
                },
                {
                  "@type": "Question",
                  name: "When does ReceiptSnap launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting Q1 2026. Join the waitlist to get early access and lock in launch pricing."
                  }
                },
                {
                  "@type": "Question",
                  name: "Is my data secure?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Your receipt data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell your data or share it with third parties."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased bg-[var(--color-warm-white)] text-[var(--color-charcoal)]">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="effdf860-1b21-4b71-9520-bf7772881998" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}