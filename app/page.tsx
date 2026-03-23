"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  Receipt,
  Shield,
  Clock,
  DollarSign,
  FileSpreadsheet,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star,
  Menu,
  X,
  ChevronDown,
  Scan,
  FolderOpen,
  AlertTriangle,
  TrendingDown,
  Zap,
  Car,
  BarChart3,
  Lock,
  Wrench,
  Briefcase,
  MapPin,
  HelpCircle,
  Mail,
  Send,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Intersection Observer hook                                          */
/* ------------------------------------------------------------------ */
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
}

/* ------------------------------------------------------------------ */
/* Main page component                                                 */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Section observers */
  const heroSection = useIntersectionObserver();
  const credibilitySection = useIntersectionObserver();
  const problemSection = useIntersectionObserver();
  const solutionSection = useIntersectionObserver();
  const featuresSection = useIntersectionObserver();
  const howItWorksSection = useIntersectionObserver();
  const useCasesSection = useIntersectionObserver();
  const pricingSection = useIntersectionObserver();
  const faqSection = useIntersectionObserver();
  const finalCtaSection = useIntersectionObserver();

  const handleSubmit = useCallback(
    async (e: React.FormEvent, emailValue: string) => {
      e.preventDefault();
      if (!emailValue || isSubmitting) return;

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailValue }),
        });

        if (response.ok) {
          setSubmitStatus("success");
          setEmail("");
          setCtaEmail("");
        } else {
          setSubmitStatus("error");
        }
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting]
  );

  /* -------------------------------------------------------------- */
  /* DATA                                                            */
  /* -------------------------------------------------------------- */

  const painPoints = [
    {
      icon: <Receipt className="w-7 h-7 text-red-500" />,
      bgColor: "bg-red-50",
      title: "Receipts Disappear Into the Void",
      body: (
        <>
          You buy tools at Home Depot, materials at Lowe&apos;s, fuel at Shell
          &mdash; and the receipts end up crumpled in your truck console, faded
          in your wallet, or lost in a camera roll of 10,000 photos.{" "}
          <span className="font-semibold text-[var(--color-charcoal)]">
            40% of business receipts are lost before tax season
          </span>
          , costing the average contractor $480+ in missed deductions.
        </>
      ),
    },
    {
      icon: <AlertTriangle className="w-7 h-7 text-orange-500" />,
      bgColor: "bg-orange-50",
      title: "Your Accountant Asks, You Scramble",
      body: (
        <>
          Every February, your accountant sends the dreaded email: &quot;I need
          all your business expenses categorized by type.&quot; You spend{" "}
          <span className="font-semibold text-[var(--color-charcoal)]">
            15-20 hours
          </span>{" "}
          digging through photos, bank statements, and memory &mdash; trying to
          remember if that $347 charge was for tools or personal groceries.
        </>
      ),
    },
    {
      icon: <TrendingDown className="w-7 h-7 text-[var(--color-gold)]" />,
      bgColor: "bg-amber-50",
      title: "You Pay More Than You Owe",
      body: (
        <>
          Without organized receipts, you miss legitimate deductions: the
          mileage to job sites, the work boots, the phone bill, the home office
          supplies. The IRS doesn&apos;t remind you of deductions you forgot
          &mdash; they just take your money. Self-employed workers overpay an
          average of{" "}
          <span className="font-semibold text-[var(--color-charcoal)]">
            $1,200/year
          </span>
          .
        </>
      ),
    },
  ];

  const beforeAfter = [
    {
      before:
        "Receipts crumple in your truck for months, fade to illegible white, get thrown away with fast food wrappers",
      after:
        "Snap a photo in 10 seconds at checkout -- it's saved forever, readable even if the paper fades",
    },
    {
      before:
        "Spend 15+ hours in February sorting through photos, guessing categories, and manually typing into Excel",
      after:
        "AI reads and categorizes every receipt automatically -- export a clean spreadsheet in one click when your accountant asks",
    },
    {
      before:
        "Miss $500-2,000 in legitimate deductions because you can't find or remember all your business expenses",
      after:
        "Every expense is captured, categorized, and ready for Schedule C -- designed to help you find every deduction you've earned",
    },
  ];

  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: "AI-Powered OCR",
      body: "Reads any receipt -- even crumpled, faded, or handwritten. Extracts merchant, date, amount, and line items with 95%+ accuracy.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Tax Categorization",
      body: "Auto-sorts into IRS Schedule C categories: Supplies, Tools, Fuel, Meals, Vehicle Expenses, Home Office, and more. Learns your patterns.",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" />,
      title: "One-Click Export",
      body: "Generate a clean CSV or PDF organized by category, date, and amount. Compatible with QuickBooks, Excel, TurboTax, and any accounting software.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Year-Round Tracking",
      body: "See expenses by week, month, or quarter. Get alerts when you're spending more than usual. Know your profit margins in real-time.",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Mileage Integration",
      body: "IRS allows $0.67/mile deduction. Track every drive to job sites automatically. 500 miles/week = $17,000+ in annual deductions.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Bank-Level Security",
      body: "256-bit encryption, SOC 2 compliant infrastructure. We never access your bank accounts -- only the receipts you upload. Delete data anytime.",
    },
  ];

  const howSteps = [
    {
      num: "1",
      title: "Snap",
      icon: <Camera className="w-8 h-8 text-white" />,
      body: "Take a photo of any receipt at checkout, in your truck, or at your desk. Our mobile-optimized upload handles any image quality.",
      color: "bg-[var(--color-forest)]",
    },
    {
      num: "2",
      title: "Categorize",
      icon: <FolderOpen className="w-8 h-8 text-white" />,
      body: "Within 2 seconds, AI extracts all the data and assigns it to the right tax category. Review and adjust if needed.",
      color: "bg-[var(--color-forest-light)]",
    },
    {
      num: "3",
      title: "Export",
      icon: <FileSpreadsheet className="w-8 h-8 text-white" />,
      body: "One click generates a clean spreadsheet with all expenses organized by category. Email it, download it, or sync to your accounting software.",
      color: "bg-[var(--color-mint)]",
    },
  ];

  const useCases = [
    {
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      iconBg: "bg-orange-100",
      gradient: "from-orange-50 to-amber-50",
      border: "border-orange-200/60",
      name: "Solo Electrician",
      sub: "25+ receipts/week, 1,300+/year",
      without:
        "Stuffs receipts in glove box. Spends two Sundays in February typing into Excel. Misses $800-1,200 in deductions.",
      withSnap: (
        <>
          Snaps each receipt at checkout. Exports in 30 seconds at tax time.
          Projected to find{" "}
          <span className="font-bold">$3,200 in additional deductions</span>.
        </>
      ),
    },
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      iconBg: "bg-indigo-100",
      gradient: "from-blue-50 to-indigo-50",
      border: "border-indigo-200/60",
      name: "Freelance Consultant",
      sub: "Software, travel, home office",
      without:
        "47 browser tabs of subscription receipts. A folder of unorganized photos. No idea what she spent last year.",
      withSnap: (
        <>
          Forwards email receipts, snaps physical ones. AI categorizes
          automatically.{" "}
          <span className="font-bold">
            Quarterly tax estimates are finally accurate
          </span>
          .
        </>
      ),
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      gradient: "from-green-50 to-emerald-50",
      border: "border-emerald-200/60",
      name: "Gig Economy Driver",
      sub: "Mileage, gas, phone, car washes",
      without:
        "No system. Guesses mileage at tax time. Claims 60% of actual miles. Leaving $8,000+ in deductions on the table.",
      withSnap: (
        <>
          Logs mileage automatically. Snaps gas receipts. Complete record at tax
          time.{" "}
          <span className="font-bold">Tax bill drops by $2,100</span>.
        </>
      ),
    },
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      highlight: false,
      badge: null,
      features: [
        "15 receipts/month",
        "AI categorization",
        "CSV export",
        "Mobile app access",
        "Community support",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Everything in Free",
        "Unlimited receipts",
        "Mileage tracking",
        "Quarterly tax estimates",
        "QuickBooks integration",
        "Priority support",
      ],
      cta: "Join Waitlist",
    },
    {
      name: "Business",
      price: "$29",
      period: "/month",
      highlight: false,
      badge: null,
      features: [
        "Everything in Pro",
        "Multiple businesses",
        "Team members (up to 3)",
        "Custom categories",
        "API access",
        "Dedicated support",
      ],
      cta: "Join Waitlist",
    },
  ];

  const faqs = [
    {
      q: "How accurate is the AI at reading receipts?",
      a: "The AI is designed to achieve 95%+ accuracy on standard printed receipts. For unusual formats (handwritten, faded, or damaged), accuracy may be lower, but you can always manually correct any errors. The system learns from your corrections to improve over time.",
    },
    {
      q: "What if I'm already using QuickBooks or Expensify?",
      a: "ReceiptSnap is designed to complement your existing workflow. Export to CSV and import into QuickBooks, or use our direct QuickBooks integration (Pro plan). Many users find ReceiptSnap simpler for receipt capture while keeping QuickBooks for full accounting.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use 256-bit encryption, store data on SOC 2 compliant infrastructure (Supabase), and never access your bank accounts or financial data. You can delete all your data with one click at any time.",
    },
    {
      q: "What happens if I miss a receipt?",
      a: "You can upload photos retroactively anytime -- even photos from months ago in your camera roll. The AI will read the date from the receipt, not the upload date. We also support email forwarding for digital receipts.",
    },
    {
      q: "Do I need an accountant to use this?",
      a: "No. ReceiptSnap is built for self-employed people who do their own taxes with TurboTax, H&R Block, or similar software. The export format uses standard IRS Schedule C categories. If you have an accountant, they'll love getting a clean spreadsheet instead of a shoebox of receipts.",
    },
    {
      q: "How is this different from Expensify or QuickBooks Self-Employed?",
      a: "ReceiptSnap is designed specifically for solo self-employed workers (not teams), with a simpler interface and lower price. Expensify is built for enterprise expense reports. QuickBooks Self-Employed bundles receipt tracking with full accounting software. If you just want dead-simple receipt to tax category, ReceiptSnap is built for you.",
    },
    {
      q: "Can I track mileage too?",
      a: "Yes, on the Pro plan and above. Log trips manually or use automatic GPS tracking. The IRS standard mileage deduction ($0.67/mile in 2025) can add up to $10,000+ in annual deductions for contractors who drive to job sites.",
    },
    {
      q: "When does ReceiptSnap launch?",
      a: "We're in early access now. Full public launch is planned for Q1 2026. Join the waitlist to get immediate early access and lock in founding member pricing.",
    },
  ];

  /* -------------------------------------------------------------- */
  /* RENDER                                                          */
  /* -------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[var(--color-warm-white)] overflow-x-hidden">
      {/* ============================================================ */}
      {/* NAVIGATION                                                    */}
      {/* ============================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/90 nav-blur border-b border-[var(--color-forest)]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-[var(--color-forest)] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Camera className="w-5 h-5 text-[var(--color-mint)]" />
              </div>
              <span className="font-display font-bold text-xl text-[var(--color-forest)]">
                ReceiptSnap
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium"
              >
                FAQ
              </a>
              <a
                href="#waitlist"
                className="bg-[var(--color-forest)] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[var(--color-forest-light)] transition-colors text-sm inline-flex items-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-[var(--color-forest)]/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--color-forest)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--color-forest)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--color-warm-white)] border-t border-[var(--color-forest)]/8 py-4 px-5 animate-fade-in">
            <div className="flex flex-col gap-1">
              {[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-forest)] transition-colors font-medium py-3 px-3 rounded-lg hover:bg-[var(--color-forest)]/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[var(--color-forest)] text-white px-5 py-3 rounded-xl font-semibold text-center mt-2 inline-flex items-center justify-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section
        ref={heroSection.ref}
        className="pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 gradient-mesh-hero noise-overlay overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left -- copy */}
            <div
              className={`${heroSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              <div className="inline-flex items-center gap-2 bg-[var(--color-mint)]/10 text-[var(--color-forest)] px-4 py-2 rounded-full text-sm font-medium mb-8 border border-[var(--color-mint)]/20">
                <span className="w-2 h-2 bg-[var(--color-mint)] rounded-full animate-pulse-dot" />
                Early Access Available Now
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold text-[var(--color-forest)] leading-[1.1] mb-6 tracking-tight">
                Stop Overpaying{" "}
                <span className="relative inline-block">
                  Taxes
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-[var(--color-gold)]/30 rounded-full" />
                </span>{" "}
                on Your Contractor Income
              </h1>

              <p className="text-lg sm:text-xl text-[var(--color-slate)] mb-10 leading-relaxed max-w-xl">
                Self-employed professionals miss{" "}
                <span className="text-[var(--color-forest)] font-semibold">
                  $1,200+ in tax deductions
                </span>{" "}
                every year because receipts get lost, crumpled, or forgotten.
                ReceiptSnap AI turns any receipt photo into a tax-ready
                spreadsheet in seconds.
              </p>

              <form
                onSubmit={(e) => handleSubmit(e, email)}
                id="waitlist"
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubmitStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-5 py-4 rounded-xl border-2 border-[var(--color-forest)]/15 text-[var(--color-charcoal)] bg-white transition-all text-base"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-forest)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-forest-light)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap animate-pulse-glow inline-flex items-center justify-center gap-2 text-base"
                >
                  {isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {submitStatus === "success" && (
                <p className="text-[var(--color-forest-light)] font-medium mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--color-mint)]" />
                  You&apos;re on the list! Check your email for next steps.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 font-medium mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="text-sm text-[var(--color-slate)] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[var(--color-mint)]" />
                Be one of the first 500 contractors to try it free &bull; No
                credit card required
              </p>
            </div>

            {/* Right -- visual */}
            <div
              className={`relative ${heroSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}
            >
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-elevated)] border border-[var(--color-forest)]/5">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Before phone */}
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full z-10 whitespace-nowrap">
                      The Chaos
                    </div>
                    <div className="bg-[var(--color-charcoal)] rounded-2xl p-3 shadow-xl">
                      <div className="bg-gray-800 rounded-xl p-2.5 space-y-2">
                        <div className="h-10 sm:h-12 bg-gray-600/50 rounded-lg transform rotate-2" />
                        <div className="h-8 sm:h-10 bg-gray-500/50 rounded-lg transform -rotate-1" />
                        <div className="h-12 sm:h-14 bg-gray-600/50 rounded-lg transform rotate-3" />
                        <div className="h-6 sm:h-8 bg-gray-500/50 rounded-lg" />
                        <div className="h-10 sm:h-12 bg-gray-600/50 rounded-lg transform -rotate-2" />
                      </div>
                    </div>
                  </div>

                  {/* After phone */}
                  <div className="relative animate-float">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-mint)] text-white text-xs font-bold px-3 py-1 rounded-full z-10 whitespace-nowrap">
                      Organized
                    </div>
                    <div className="bg-[var(--color-charcoal)] rounded-2xl p-3 shadow-xl">
                      <div className="bg-white rounded-xl p-2.5 space-y-1.5">
                        {[
                          { label: "Supplies", amount: "$847" },
                          { label: "Fuel", amount: "$234" },
                          { label: "Tools", amount: "$1,203" },
                          { label: "Meals", amount: "$156" },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
                          >
                            <span className="text-xs font-medium text-[var(--color-charcoal)]">
                              {row.label}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-[var(--color-forest)]">
                                {row.amount}
                              </span>
                              <CheckCircle className="w-3 h-3 text-[var(--color-mint)]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative blurs */}
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[var(--color-gold)]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -top-6 -left-6 w-36 h-36 bg-[var(--color-mint)]/15 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CREDIBILITY BAR                                               */}
      {/* ============================================================ */}
      <section
        ref={credibilitySection.ref}
        className="py-14 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)] border-y border-[var(--color-forest)]/5"
      >
        <div
          className={`max-w-5xl mx-auto ${credibilitySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p className="text-center text-[var(--color-forest)] font-medium mb-8 text-sm sm:text-base">
            Built for self-employed contractors, freelancers, and gig workers
            managing $30K-$500K in annual income
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8">
            {[
              { icon: <FileSpreadsheet className="w-5 h-5" />, label: "QuickBooks Export" },
              { icon: <BarChart3 className="w-5 h-5" />, label: "Xero Compatible" },
              { icon: <FolderOpen className="w-5 h-5" />, label: "Google Drive" },
              { icon: <FileSpreadsheet className="w-5 h-5" />, label: "Excel/CSV Export" },
            ].map((item) => (
              <div
                key={item.label}
                className="credibility-item flex items-center gap-2 text-[var(--color-slate)]"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--color-charcoal)] text-sm max-w-2xl mx-auto">
            <span className="font-semibold">
              93% of self-employed workers
            </span>{" "}
            don&apos;t track all deductible expenses &mdash; costing them an
            average of{" "}
            <span className="font-semibold text-[var(--color-forest)]">
              $1,200+ annually
            </span>{" "}
            in overpaid taxes.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROBLEM / PAIN POINTS                                         */}
      {/* ============================================================ */}
      <section
        ref={problemSection.ref}
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 ${problemSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider mb-3">
              The Problem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-5">
              Sound Familiar?
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              Every self-employed person knows these struggles. Here&apos;s
              what&apos;s costing you money.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className={`card-lift bg-white rounded-2xl p-7 sm:p-8 border border-[var(--color-forest)]/5 shadow-[var(--shadow-card)] ${
                  problemSection.isVisible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div
                  className={`w-14 h-14 ${p.bgColor} rounded-xl flex items-center justify-center mb-6`}
                >
                  {p.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--color-forest)] mb-4">
                  {p.title}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BEFORE / AFTER SOLUTION                                       */}
      {/* ============================================================ */}
      <section
        ref={solutionSection.ref}
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)] noise-overlay"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 ${solutionSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-mint)] font-semibold text-sm uppercase tracking-wider mb-3">
              The Transformation
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Before vs. After ReceiptSnap
            </h2>
            <p className="text-lg text-[var(--color-mint-light)]/80 max-w-2xl mx-auto">
              See how receipt tracking transforms from your biggest headache to
              a 10-second habit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {beforeAfter.map((item, i) => (
              <div
                key={i}
                className={`${solutionSection.isVisible ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <div className="bg-red-500/15 backdrop-blur-sm rounded-xl p-6 mb-4 border border-red-500/10">
                  <p className="text-red-300 font-semibold mb-2 flex items-center gap-2 text-sm">
                    <X className="w-4 h-4" /> Before
                  </p>
                  <p className="text-white/85 leading-relaxed text-sm">
                    {item.before}
                  </p>
                </div>
                <div className="bg-[var(--color-mint)]/15 backdrop-blur-sm rounded-xl p-6 border border-[var(--color-mint)]/10">
                  <p className="text-[var(--color-mint)] font-semibold mb-2 flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" /> After
                  </p>
                  <p className="text-white/85 leading-relaxed text-sm">
                    {item.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURES                                                      */}
      {/* ============================================================ */}
      <section
        ref={featuresSection.ref}
        id="features"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 ${featuresSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-5">
              Everything You Need to Stop Overpaying
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              AI-powered features designed specifically for self-employed
              professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group card-lift bg-white rounded-2xl p-7 sm:p-8 border border-[var(--color-forest)]/5 shadow-[var(--shadow-card)] hover:border-[var(--color-mint)]/40 ${
                  featuresSection.isVisible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="w-12 h-12 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-5 text-[var(--color-forest)] group-hover:bg-[var(--color-mint)]/20 group-hover:text-[var(--color-forest-light)] transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--color-forest)] mb-3">
                  {f.title}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed text-[0.95rem]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                  */}
      {/* ============================================================ */}
      <section
        ref={howItWorksSection.ref}
        id="how-it-works"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)] noise-overlay"
      >
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-16 ${howItWorksSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-5">
              Three Steps. Under 60 Seconds.
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              Three steps. Under 60 seconds. Done.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howSteps.map((step, i) => (
              <div
                key={i}
                className={`text-center step-connector ${
                  howItWorksSection.isVisible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div
                  className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-widest mb-2">
                  Step {step.num}
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-forest)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* USE CASES                                                     */}
      {/* ============================================================ */}
      <section
        ref={useCasesSection.ref}
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 ${useCasesSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider mb-3">
              Use Cases
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-5">
              Built for People Like You
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              See how different self-employed professionals would use
              ReceiptSnap.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className={`card-lift bg-gradient-to-br ${uc.gradient} rounded-2xl p-7 sm:p-8 border ${uc.border} ${
                  useCasesSection.isVisible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 ${uc.iconBg} rounded-full flex items-center justify-center`}
                  >
                    {uc.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-forest)]">
                      {uc.name}
                    </h3>
                    <p className="text-sm text-[var(--color-slate)]">
                      {uc.sub}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-sm font-semibold text-red-600 mb-1.5 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5" /> Without ReceiptSnap
                    </p>
                    <p className="text-sm text-[var(--color-charcoal)] leading-relaxed">
                      {uc.without}
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-sm font-semibold text-[var(--color-forest-light)] mb-1.5 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--color-mint)]" />{" "}
                      With ReceiptSnap
                    </p>
                    <p className="text-sm text-[var(--color-charcoal)] leading-relaxed">
                      {uc.withSnap}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--color-slate)] mt-10 italic">
            These are projected use cases based on research data and user
            interviews, not testimonials from existing customers.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRICING                                                       */}
      {/* ============================================================ */}
      <section
        ref={pricingSection.ref}
        id="pricing"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)] noise-overlay"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 ${pricingSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[var(--color-mint)]/15 text-[var(--color-mint)] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[var(--color-mint)]/20">
              <Star className="w-4 h-4" />
              Planned Launch Pricing &mdash; Early Access Available Now
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[var(--color-mint-light)]/80 max-w-2xl mx-auto">
              Pay less than you&apos;d lose in missed deductions. Save 20% with
              annual billing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pricingTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl p-7 sm:p-8 ${
                  tier.highlight
                    ? "pricing-popular scale-[1.02] md:scale-105"
                    : "shadow-[var(--shadow-card)]"
                } ${
                  pricingSection.isVisible
                    ? `animate-fade-in-up delay-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-mint)] text-white text-sm font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-[var(--color-forest)] mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[var(--color-forest)]">
                    {tier.price}
                  </span>
                  <span className="text-[var(--color-slate)]">
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-[var(--color-charcoal)] text-[0.95rem]"
                    >
                      <CheckCircle className="w-5 h-5 text-[var(--color-mint)] flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: feat.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    tier.highlight
                      ? "bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-light)]"
                      : "bg-[var(--color-forest)]/10 text-[var(--color-forest)] hover:bg-[var(--color-forest)]/15"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Pricing sub-FAQs */}
          <div
            className={`mt-16 grid md:grid-cols-3 gap-8 ${pricingSection.isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}
          >
            {[
              {
                q: "When does ReceiptSnap launch?",
                a: "Early access is available now. Full public launch is planned for Q1 2026.",
              },
              {
                q: "Will there be a free trial?",
                a: "Yes! Early access members get free usage through April 2026. No credit card required.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, no commitment. Cancel with one click if it's not saving you time.",
              },
            ].map((item) => (
              <div key={item.q} className="text-center">
                <h4 className="font-bold text-white mb-2">{item.q}</h4>
                <p className="text-[var(--color-mint-light)]/70 text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <section
        ref={faqSection.ref}
        id="faq"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-warm-white)]"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className={`text-center mb-14 ${faqSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <p className="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-5">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border border-[var(--color-forest)]/5 shadow-[var(--shadow-card)] overflow-hidden ${
                  faqSection.isVisible
                    ? `animate-fade-in-up delay-${Math.min((i + 1) * 100, 800)}`
                    : "opacity-0"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[var(--color-cream)]/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="font-display font-bold text-[var(--color-forest)] pr-4 text-[0.95rem] sm:text-base">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-slate)] flex-shrink-0 faq-chevron ${
                      openFaq === i ? "open" : ""
                    }`}
                  />
                </button>
                <div
                  className={`faq-answer ${openFaq === i ? "open" : ""}`}
                >
                  <div className="faq-answer-inner">
                    <p className="text-[var(--color-slate)] leading-relaxed px-5 sm:px-6 pb-5 sm:pb-6 text-[0.95rem]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA                                                     */}
      {/* ============================================================ */}
      <section
        ref={finalCtaSection.ref}
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 gradient-mesh-cta noise-overlay"
      >
        <div
          className={`max-w-3xl mx-auto text-center ${finalCtaSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-mint)]/15 rounded-2xl mb-8">
            <DollarSign className="w-8 h-8 text-[var(--color-mint)]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Stop Overpaying Taxes?
          </h2>
          <p className="text-xl text-[var(--color-mint-light)]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join contractors, freelancers, and gig workers who are already
            tracking receipts the smart way. Early access is free through April
            2026 &mdash; no credit card required.
          </p>

          <form
            onSubmit={(e) => handleSubmit(e, ctaEmail)}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6"
          >
            <input
              type="email"
              value={ctaEmail}
              onChange={(e) => {
                setCtaEmail(e.target.value);
                setSubmitStatus("idle");
              }}
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-5 py-4 rounded-xl border-2 border-white/20 text-[var(--color-charcoal)] bg-white transition-all text-base"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-gold)] text-[var(--color-forest)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-gold-light)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap inline-flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? (
                "Joining..."
              ) : (
                <>
                  Join Now
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {submitStatus === "success" && (
            <p className="text-[var(--color-mint)] font-medium mb-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              You&apos;re on the list! Check your email for next steps.
            </p>
          )}

          <p className="text-white/50 text-sm italic">
            &quot;You&apos;re building something for people exactly like me
            &mdash; finally.&quot; &mdash; Early access member feedback
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                        */}
      {/* ============================================================ */}
      <footer className="py-14 px-4 sm:px-6 lg:px-8 bg-[var(--color-charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-[var(--color-forest-light)] rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[var(--color-mint)]" />
                </div>
                <span className="font-display font-bold text-xl text-white">
                  ReceiptSnap
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                AI-powered receipt tracking for self-employed professionals.
                Stop overpaying taxes.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2026 ReceiptSnap AI. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Product Hunt"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803c2.319 0 4.2 1.88 4.2 4.2 0 2.321-1.881 4.2-4.2 4.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MOBILE STICKY CTA                                             */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-warm-white)]/95 mobile-cta-bar border-t border-[var(--color-forest)]/8 md:hidden z-40">
        <a
          href="#waitlist"
          className="flex items-center justify-center gap-2 w-full text-center bg-[var(--color-forest)] text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg"
        >
          Join the Waitlist
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </main>
  );
}
