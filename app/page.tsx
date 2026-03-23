"use client";

import { useState, useEffect, useRef } from "react";

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-b border-[var(--color-forest)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-forest)] rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📸</span>
              </div>
              <span className="font-[family-name:var(--font-fraunces)] font-semibold text-[var(--color-forest)] text-lg">ReceiptSnap</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">How It Works</a>
              <a href="#pricing" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">Pricing</a>
              <a href="#faq" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">FAQ</a>
              <a href="#waitlist" className="bg-[var(--color-forest)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-forest-light)] transition-colors">Join Waitlist</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-[var(--color-forest)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[var(--color-forest)]/10">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#pricing" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#faq" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#waitlist" className="bg-[var(--color-forest)] text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-[var(--color-forest-light)] transition-colors" onClick={() => setMobileMenuOpen(false)}>Join Waitlist</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 gradient-mesh noise-overlay relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[var(--color-mint)] rounded-full animate-pulse"></span>
                Launching January 2025
              </div>
              
              <h1 className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-charcoal)] leading-[1.1] mb-6">
                Stop Overpaying Taxes on Your{" "}
                <span className="text-[var(--color-forest)]">Contractor Income</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[var(--color-slate)] mb-8 leading-relaxed max-w-xl">
                Snap a photo of any receipt in 10 seconds. Our AI categorizes it for taxes instantly. Export a tax-ready spreadsheet when your accountant asks. No more lost receipts, missed deductions, or Sunday afternoons drowning in Excel.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md" id="waitlist">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-forest)]/20 focus:border-[var(--color-forest)] focus:ring-2 focus:ring-[var(--color-forest)]/20 outline-none transition-all text-[var(--color-charcoal)]"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-forest)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest-light)] transition-all disabled:opacity-70 whitespace-nowrap shadow-lg shadow-[var(--color-forest)]/20 hover:shadow-xl hover:shadow-[var(--color-forest)]/30 hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
              
              {submitStatus === "success" && (
                <p className="mt-3 text-[var(--color-forest)] font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You&apos;re on the list! We&apos;ll email you when early access is ready.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-3 text-red-600 font-medium">Something went wrong. Please try again.</p>
              )}

              <p className="mt-4 text-sm text-[var(--color-slate)]">
                Be one of the first 100 contractors to get Founder Pricing
              </p>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in animation-delay-300">
              <div className="relative bg-gradient-to-br from-[var(--color-forest)]/5 to-[var(--color-mint)]/10 rounded-3xl p-8 lg:p-12">
                {/* Before/After Phone Mockup */}
                <div className="flex items-center justify-center gap-4 sm:gap-8">
                  {/* Before - Chaos */}
                  <div className="relative">
                    <div className="w-32 sm:w-40 h-64 sm:h-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                      <div className="h-6 bg-gray-100 flex items-center justify-center">
                        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="w-full h-8 bg-gray-100 rounded transform rotate-2"></div>
                        <div className="w-full h-8 bg-gray-100 rounded transform -rotate-1"></div>
                        <div className="w-full h-8 bg-gray-100 rounded transform rotate-3"></div>
                        <div className="w-3/4 h-8 bg-gray-100 rounded transform -rotate-2"></div>
                        <div className="w-full h-8 bg-gray-100 rounded transform rotate-1"></div>
                        <div className="text-center text-xs text-gray-400 mt-4">📦 Chaos</div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  </div>

                  {/* Arrow */}
                  <div className="text-[var(--color-forest)] text-2xl animate-pulse-gentle">→</div>

                  {/* After - Organized */}
                  <div className="relative">
                    <div className="w-32 sm:w-40 h-64 sm:h-72 bg-white rounded-2xl shadow-xl border border-[var(--color-forest)]/20 overflow-hidden">
                      <div className="h-6 bg-[var(--color-forest)] flex items-center justify-center">
                        <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="w-full h-8 bg-[var(--color-mint)]/20 rounded flex items-center px-2 gap-2">
                          <span className="text-[var(--color-forest)]">✓</span>
                          <span className="text-xs text-[var(--color-charcoal)]">Home Depot</span>
                        </div>
                        <div className="w-full h-8 bg-[var(--color-mint)]/20 rounded flex items-center px-2 gap-2">
                          <span className="text-[var(--color-forest)]">✓</span>
                          <span className="text-xs text-[var(--color-charcoal)]">Shell Gas</span>
                        </div>
                        <div className="w-full h-8 bg-[var(--color-mint)]/20 rounded flex items-center px-2 gap-2">
                          <span className="text-[var(--color-forest)]">✓</span>
                          <span className="text-xs text-[var(--color-charcoal)]">Lowes</span>
                        </div>
                        <div className="w-full h-8 bg-[var(--color-mint)]/20 rounded flex items-center px-2 gap-2">
                          <span className="text-[var(--color-forest)]">✓</span>
                          <span className="text-xs text-[var(--color-charcoal)]">AutoZone</span>
                        </div>
                        <div className="text-center text-xs text-[var(--color-forest)] mt-4 font-medium">📊 Organized</div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-mint)] rounded-full flex items-center justify-center text-[var(--color-forest)] text-xs font-bold">✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-8 bg-[var(--color-forest)]/5 border-y border-[var(--color-forest)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[var(--color-forest)] font-medium text-center md:text-left">
              Built for self-employed contractors, freelancers, and consultants
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="text-[var(--color-slate)] text-sm px-3 py-1 bg-white rounded-full border border-[var(--color-forest)]/10">QuickBooks Export</span>
              <span className="text-[var(--color-slate)] text-sm px-3 py-1 bg-white rounded-full border border-[var(--color-forest)]/10">Excel/CSV</span>
              <span className="text-[var(--color-slate)] text-sm px-3 py-1 bg-white rounded-full border border-[var(--color-forest)]/10">TurboTax Ready</span>
              <span className="text-[var(--color-slate)] text-sm px-3 py-1 bg-white rounded-full border border-[var(--color-forest)]/10">IRS Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Sound Familiar?
            </h2>
            <p className="text-[var(--color-slate)] text-lg max-w-2xl mx-auto">
              The average self-employed worker misses $1,200+ in tax deductions annually due to lost or miscategorized receipts.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <AnimatedSection delay={100} className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--color-forest)]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center text-2xl mb-4">📦</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">The Shoebox Problem</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Crumpled in your truck console. Buried in your camera roll. Fading in your wallet. Research shows <strong>40% of deductible receipts get lost</strong> before tax season. That&apos;s real money disappearing.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--color-forest)]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center text-2xl mb-4">⏰</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">The Sunday Dread</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Every February, you&apos;re hunched over a laptop, squinting at faded receipts, typing amounts into Excel. That&apos;s <strong>$1,125 of your time</strong> (at $75/hr) spent on bookkeeping instead of billable work.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300} className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--color-forest)]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-xl flex items-center justify-center text-2xl mb-4">💸</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">Missed Deduction Anxiety</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                The average contractor leaves <strong>$1,200-2,000 on the table</strong> every year. That Home Depot run for drill bits? Deductible. Your phone bill? Partially deductible. But if you can&apos;t prove it, you can&apos;t claim it.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Solution / Before-After */}
      <section className="py-16 sm:py-24 bg-[var(--color-forest)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-white mb-4">
              From Chaos to Clarity
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              See how ReceiptSnap transforms your tax prep workflow
            </p>
          </AnimatedSection>

          <div className="space-y-4 sm:space-y-6">
            {[
              { before: "Receipts crumple in your truck for months", after: "Snap a photo in 10 seconds, it's saved forever" },
              { before: "5+ minutes per receipt to manually type into Excel", after: "AI reads and categorizes in 2 seconds" },
              { before: 'Guessing tax categories ("Is this Supplies or Equipment?")', after: "Automatic IRS Schedule C categorization" },
              { before: "Dreading your accountant's February email", after: "Export a clean spreadsheet in one click, anytime" },
              { before: "Losing $1,200/year in missed deductions", after: "Every receipt tracked, every deduction captured" },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 100} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 text-lg">✗</span>
                    <p className="text-white/80">{item.before}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-white/40 text-xl">→</div>
                <div className="sm:hidden flex justify-center text-white/40 text-lg">↓</div>
                <div className="flex-1 bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/20 rounded-xl p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-[var(--color-mint)] text-lg">✓</span>
                    <p className="text-white">{item.after}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Everything You Need, Nothing You Don&apos;t
            </h2>
            <p className="text-[var(--color-slate)] text-lg max-w-2xl mx-auto">
              Simple, focused features designed to save you time and money
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "📸", title: "Instant OCR Scanning", description: "Point your phone at any receipt — crumpled, faded, or coffee-stained. Our AI extracts the merchant, date, amount, and line items in under 2 seconds.", benefit: "Save 10+ minutes per receipt" },
              { icon: "🧠", title: "Smart Tax Categorization", description: "Every receipt is automatically sorted into IRS Schedule C categories. The AI learns YOUR patterns — if you always buy tools at Home Depot, it remembers.", benefit: "95%+ accuracy out of the box" },
              { icon: "📊", title: "One-Click Tax Export", description: "Export your entire year to Excel, CSV, or PDF. Organized by category, totaled automatically, formatted exactly how CPAs expect it.", benefit: "Accountant-ready in 60 seconds" },
              { icon: "☁️", title: "Photo Backup Forever", description: "Every receipt photo is backed up automatically. IRS wants proof from 3 years ago? Pull it up in seconds. No more digging through filing cabinets.", benefit: "Audit anxiety? Gone." },
              { icon: "📈", title: "Year-Round Tax Insights", description: "See your deductible expenses by category in real-time. Monthly summaries and quarterly tax estimate reminders help you avoid April surprises.", benefit: "Know your numbers all year" },
              { icon: "📶", title: "Works Offline", description: "On a rural job site with no cell service? Snap the receipt anyway. It syncs automatically when you're back online.", benefit: "Never miss a deduction" },
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100} className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--color-forest)]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[var(--color-forest)]/5 group-hover:bg-[var(--color-forest)]/10 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">{feature.title}</h3>
                <p className="text-[var(--color-slate)] leading-relaxed mb-4">{feature.description}</p>
                <p className="text-[var(--color-forest)] font-medium text-sm">→ {feature.benefit}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-warm-white)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Three Steps to Tax-Ready
            </h2>
            <p className="text-[var(--color-slate)] text-lg max-w-2xl mx-auto">
              The entire process takes under 60 seconds
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: "1", title: "Snap", description: "Open the app, tap the camera button, and snap a photo. Takes 10 seconds. Works with crumpled, faded, or partially torn receipts.", icon: "📱" },
              { step: "2", title: "Review", description: "See the merchant, amount, and tax category appear in 2 seconds. Quick glance to confirm it's right. Tap to adjust if needed.", icon: "✅" },
              { step: "3", title: "Export", description: "At tax time, hit Export. Choose Excel, CSV, or PDF. Get a clean spreadsheet organized by IRS category. Email it to your CPA. Done.", icon: "📤" },
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 150} className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-[var(--color-forest)] rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-[var(--color-charcoal)] mb-3">{step.title}</h3>
                  <p className="text-[var(--color-slate)] leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-6 lg:-right-8 text-[var(--color-forest)]/30 text-4xl">→</div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Built for How You Work
            </h2>
            <p className="text-[var(--color-slate)] text-lg max-w-2xl mx-auto">
              Real scenarios from self-employed professionals like you
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                persona: "🔌 The Solo Electrician",
                name: "Mike",
                context: "Runs to Home Depot 3x a week for wire, outlets, and tools. Fills up his truck daily.",
                story: "Before ReceiptSnap, 60% of his receipts ended up crumpled in his center console — lost by December. Now, he snaps each receipt right at checkout while walking to his truck. Takes 10 seconds. By tax time, he'll have 400+ organized receipts and an estimated $3,200 in additional deductions.",
                highlight: "$3,200 in saved deductions"
              },
              {
                persona: "💼 The Freelance Consultant",
                name: "Sarah",
                context: "Works from home, meets clients at coffee shops, and attends 2-3 conferences a year.",
                story: "Her expenses used to be scattered across personal credit cards, Venmo, and cash. She spent 8 hours every February sorting them. With ReceiptSnap, she forwards digital receipts via email, snaps photos of paper ones, and the AI handles categorization. Her accountant gets a clean export with home office, travel, and software subscriptions all separated.",
                highlight: "8 hours saved every February"
              },
              {
                persona: "🚗 The Gig Driver",
                name: "James",
                context: "Drives 600+ miles a week for Uber/DoorDash. Fills up every other day.",
                story: "At $0.67/mile, that's $400+/week in deductions he was barely tracking. He also buys phone chargers, phone mounts, and cleaning supplies. ReceiptSnap captures every gas receipt and automatically calculates his mileage deduction. Combined with miscellaneous expenses, he's projected to find $8,000+ in annual deductions.",
                highlight: "$8,000+ in annual deductions"
              }
            ].map((useCase, index) => (
              <AnimatedSection key={index} delay={index * 150} className="bg-white rounded-2xl border border-[var(--color-forest)]/10 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-[var(--color-forest)]/5 px-6 py-4">
                  <span className="text-2xl">{useCase.persona.split(" ")[0]}</span>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-semibold text-[var(--color-charcoal)] mt-2">{useCase.persona.slice(3)}</h3>
                  <p className="text-[var(--color-slate)] text-sm mt-1">{useCase.context}</p>
                </div>
                <div className="p-6">
                  <p className="text-[var(--color-slate)] leading-relaxed mb-4">{useCase.story}</p>
                  <div className="bg-[var(--color-mint)]/10 rounded-lg px-4 py-3 inline-block">
                    <p className="text-[var(--color-forest)] font-semibold text-sm">{useCase.highlight}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={500} className="mt-8 text-center">
            <p className="text-[var(--color-slate)] text-sm italic">
              * These are projected use cases based on research data, not testimonials from existing users.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24 bg-[var(--color-forest)]/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-[var(--color-gold)]/10 text-[var(--color-gold)] px-3 py-1.5 rounded-full text-sm font-medium mb-4">
              Planned Launch Pricing
            </div>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[var(--color-slate)] text-lg max-w-2xl mx-auto">
              Pick the plan that matches your receipt volume. Upgrade or downgrade anytime.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <AnimatedSection delay={100} className="bg-white rounded-2xl border border-[var(--color-forest)]/10 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[var(--color-charcoal)]">$19</span>
                  <span className="text-[var(--color-slate)]">/month</span>
                </div>
                <p className="text-sm text-[var(--color-slate)] mb-6">or $159/year (save $69)</p>
                <ul className="space-y-3 mb-8">
                  {["50 receipts/month", "AI categorization", "Excel/CSV export", "Cloud backup", "Email support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--color-slate)]">
                      <span className="text-[var(--color-forest)] mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest)]/20 transition-colors">
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            {/* Pro - Most Popular */}
            <AnimatedSection delay={200} className="bg-white rounded-2xl border-2 border-[var(--color-forest)] overflow-hidden relative shadow-lg">
              <div className="absolute top-0 left-0 right-0 bg-[var(--color-forest)] text-white text-center py-1.5 text-sm font-medium">
                ⭐ Most Popular
              </div>
              <div className="p-6 sm:p-8 pt-12">
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-2">Pro</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[var(--color-charcoal)]">$39</span>
                  <span className="text-[var(--color-slate)]">/month</span>
                </div>
                <p className="text-sm text-[var(--color-slate)] mb-6">or $299/year (save $169)</p>
                <ul className="space-y-3 mb-8">
                  {["200 receipts/month", "Everything in Starter", "Mileage tracking", "Quarterly tax estimates", "Priority support", "QuickBooks export"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--color-slate)]">
                      <span className="text-[var(--color-forest)] mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest-light)] transition-colors shadow-lg">
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            {/* Unlimited */}
            <AnimatedSection delay={300} className="bg-white rounded-2xl border border-[var(--color-forest)]/10 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-charcoal)] mb-2">Unlimited</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[var(--color-charcoal)]">$69</span>
                  <span className="text-[var(--color-slate)]">/month</span>
                </div>
                <p className="text-sm text-[var(--color-slate)] mb-6">or $499/year (save $329)</p>
                <ul className="space-y-3 mb-8">
                  {["Unlimited receipts", "Everything in Pro", "Multiple businesses", "Team access (coming)", "Onboarding call"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--color-slate)]">
                      <span className="text-[var(--color-forest)] mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-4 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest)]/20 transition-colors">
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Pricing FAQs */}
          <AnimatedSection delay={400} className="mt-12 sm:mt-16 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-[var(--color-charcoal)] mb-2">When does it launch?</h4>
                <p className="text-[var(--color-slate)] text-sm">January 2025. Waitlist members get early access in December.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-[var(--color-charcoal)] mb-2">Free trial?</h4>
                <p className="text-[var(--color-slate)] text-sm">Yes! 30-day free trial, no credit card required.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-[var(--color-charcoal)] mb-2">Cancel anytime?</h4>
                <p className="text-[var(--color-slate)] text-sm">Absolutely. No contracts, no fees. Pro-rata refunds on annual plans.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4 sm:space-y-6">
            {[
              { q: "Is my data secure?", a: "Yes. All receipt images and financial data are encrypted in transit (TLS 1.3) and at rest (AES-256). We use Supabase for our database, which is SOC 2 Type II compliant. We never sell your data, and you can delete your account and all data at any time." },
              { q: "What happens to my data if I cancel?", a: "Your data is yours. Before canceling, you can export everything (receipts, categories, images) as a ZIP file. After cancellation, we retain your data for 30 days in case you change your mind, then permanently delete it." },
              { q: "How accurate is the AI categorization?", a: "Our AI achieves 95%+ accuracy on standard receipts (retail, gas stations, restaurants). For ambiguous items, it learns from your corrections — after 10-20 receipts, accuracy approaches 99% for YOUR spending patterns. You always have final review before export." },
              { q: "Can I switch from Expensify/QuickBooks Self-Employed?", a: "Yes! We're building a CSV import feature for Expensify and QuickBooks SE users. Upload your existing data, and we'll migrate it to ReceiptSnap. Your historical receipts won't be lost." },
              { q: "How is this different from QuickBooks Self-Employed?", a: "QuickBooks SE is a full accounting suite with invoicing, bank connections, and tax filing — powerful but complex ($15/mo). ReceiptSnap does ONE thing: receipt tracking and categorization. If you just want dead-simple \"snap → categorize → export,\" we're 10x faster to learn and use." },
              { q: "Do I need to connect my bank account?", a: "No. ReceiptSnap is receipt-only. We never ask for bank credentials or credit card access. If you want bank transaction matching, QuickBooks or Mint are better fits. We focus purely on the receipt chaos problem." },
              { q: "What if I'm audited? Will this hold up with the IRS?", a: "ReceiptSnap stores timestamped receipt images with extracted data, which meets IRS documentation requirements. Our export format matches Schedule C categories exactly. However, we're a tool, not tax advice — always consult your CPA for audit situations." },
              { q: "When does ReceiptSnap launch?", a: "January 2025. Waitlist members get early access in December 2024 to start capturing receipts before the tax-season rush. Join now to lock in Founder Pricing ($99/year for Pro, vs $299/year at launch)." },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50} className="bg-white rounded-xl border border-[var(--color-forest)]/10 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 hover:bg-[var(--color-forest)]/5 transition-colors">
                    <h3 className="font-semibold text-[var(--color-charcoal)] pr-4">{faq.q}</h3>
                    <span className="text-[var(--color-forest)] text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className="text-[var(--color-slate)] leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-[var(--color-forest)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Be One of the First 100 Contractors to Try ReceiptSnap
            </h2>
            <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              We&apos;re building this for people exactly like you — self-employed professionals who are tired of losing money to disorganized receipts.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8">
              <div className="grid sm:grid-cols-2 gap-4 text-left mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-mint)]">✓</span>
                  <span className="text-white">Early access (December 2024)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-mint)]">✓</span>
                  <span className="text-white">30-day free trial</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-mint)]">✓</span>
                  <span className="text-white">Founder Pricing locked in</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-mint)]">✓</span>
                  <span className="text-white">Direct founder access</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-mint)] text-[var(--color-forest)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-mint-light)] transition-all disabled:opacity-70 whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Joining..." : "Count Me In"}
                </button>
              </form>

              {submitStatus === "success" && (
                <p className="mt-3 text-[var(--color-mint)] font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You&apos;re on the list!
                </p>
              )}
            </div>

            <p className="text-white/60 text-sm">
              No spam, ever. We&apos;ll only email you when early access is ready.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--color-charcoal)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-forest)] rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📸</span>
              </div>
              <span className="font-[family-name:var(--font-fraunces)] font-semibold text-white text-lg">ReceiptSnap</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#features" className="text-white/60 hover:text-white transition-colors">Product</a>
              <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a>
              <a href="mailto:hello@receiptsnap.ai" className="text-white/60 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://twitter.com/receiptsnapai" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://producthunt.com/upcoming/receiptsnap" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Product Hunt">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 0 0 0-3.6zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 0 1 0 8.4z"/></svg>
              </a>
              <a href="https://linkedin.com/company/receiptsnap" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-white/40">
              ReceiptSnap AI is built by solo founders who got tired of overpaying taxes.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-white/30 text-xs">© 2025 ReceiptSnap AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-t border-[var(--color-forest)]/10 md:hidden z-40">
        <a
          href="#waitlist"
          className="block w-full text-center bg-[var(--color-forest)] text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Join the Waitlist
        </a>
      </div>
    </main>
  );
}