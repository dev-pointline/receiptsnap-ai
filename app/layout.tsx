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
  title: "ReceiptSnap AI — Stop Overpaying Taxes on Contractor Income",
  description: "Snap a photo of any receipt. AI categorizes it for taxes instantly. Export a tax-ready spreadsheet. Built for self-employed contractors, freelancers, and consultants. Join the waitlist.",
  keywords: ["receipt tracker", "self employed expenses", "contractor tax deductions", "expense tracking app", "tax receipt organizer"],
  authors: [{ name: "ReceiptSnap AI" }],
  openGraph: {
    title: "ReceiptSnap AI — Stop Overpaying Taxes on Contractor Income",
    description: "Snap receipts in 10 seconds. AI categorizes them for taxes. Export to your accountant in one click. Join the waitlist for early access.",
    url: "https://receiptsnap.ai",
    siteName: "ReceiptSnap AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReceiptSnap AI — Stop Overpaying Taxes",
    description: "AI-powered receipt tracking for self-employed professionals. Join the waitlist.",
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
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ReceiptSnap AI",
              description: "AI-powered receipt tracking and tax categorization for self-employed professionals",
              url: "https://receiptsnap.ai",
              foundingDate: "2024",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@receiptsnap.ai",
                contactType: "customer service",
              },
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
                  name: "Is my data secure with ReceiptSnap?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All receipt images and financial data are encrypted in transit (TLS 1.3) and at rest (AES-256). We use Supabase for our database, which is SOC 2 Type II compliant. We never sell your data.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate is the AI categorization?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our AI achieves 95%+ accuracy on standard receipts. For ambiguous items, it learns from your corrections — after 10-20 receipts, accuracy approaches 99% for your spending patterns.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does ReceiptSnap launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're launching in January 2025. Waitlist members get early access in December 2024 to start capturing receipts before the tax-season rush.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="ac071513-106d-4641-b03a-6c75f7c12025" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}