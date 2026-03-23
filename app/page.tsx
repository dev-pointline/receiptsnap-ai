"use client";

import { useState, useEffect, useRef } from "react";

function useIntersectionObserver(threshold = 0.1) {
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
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setSubmitMessage("");
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSubmitMessage("You're on the list! We'll notify you when we launch.");
        setEmail("");
      } else {
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-b border-[var(--color-forest)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-[var(--color-forest)]">
              ReceiptSnap AI
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)] transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)] transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)] transition-colors">FAQ</a>
              <a href="#waitlist" className="bg-[var(--color-forest)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-moss)] transition-colors">
                Join Waitlist
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <a href="#features" className="text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)]" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#pricing" className="text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)]" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#faq" className="text-[var(--color-charcoal)]/70 hover:text-[var(--color-forest)]" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#waitlist" className="bg-[var(--color-forest)] text-white px-4 py-2 rounded-lg text-center font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-warm-white)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-3 py-1 rounded-full text-sm font-medium mb-6">
                Launching Q1 2026
              </span>
              <h1 className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-charcoal)] leading-tight mb-6">
                Stop Overpaying Taxes.<br />
                <span className="text-[var(--color-forest)]">Start Snapping Receipts.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--color-charcoal)]/70 mb-8 max-w-xl">
                The dead-simple receipt tracker that turns your phone&apos;s camera into a tax-savings machine. AI categorizes every receipt in 2 seconds. Export tax-ready spreadsheets whenever your accountant asks.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md" id="waitlist">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-forest)]/20 focus:border-[var(--color-forest)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/20 bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-forest)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-moss)] transition-colors disabled:opacity-50 whitespace-nowrap animate-pulse-subtle"
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </button>
              </form>
              {submitMessage && (
                <p className={`mt-3 text-sm ${submitMessage.includes("list") ? "text-[var(--color-forest)]" : "text-[var(--color-coral)]"}`}>
                  {submitMessage}
                </p>
              )}
              <p className="text-sm text-[var(--color-charcoal)]/50 mt-3">
                Be one of the first 100 contractors to try it free
              </p>
            </div>
            
            <div className="relative animate-slide-in-right delay-300">
              {/* Phone mockup showing before/after */}
              <div className="relative flex gap-4 justify-center">
                {/* Before Phone */}
                <div className="w-40 sm:w-48 bg-white rounded-3xl shadow-2xl p-3 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gray-100 rounded-2xl h-72 sm:h-80 flex flex-col items-center justify-center p-4">
                    <div className="text-4xl mb-2">📦</div>
                    <div className="space-y-2 w-full">
                      <div className="bg-gray-300 h-8 w-full rounded transform rotate-3"></div>
                      <div className="bg-gray-300 h-8 w-3/4 rounded transform -rotate-2"></div>
                      <div className="bg-gray-300 h-8 w-5/6 rounded transform rotate-1"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">Chaos</p>
                  </div>
                </div>
                
                {/* After Phone */}
                <div className="w-40 sm:w-48 bg-white rounded-3xl shadow-2xl p-3 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-[var(--color-cream)] rounded-2xl h-72 sm:h-80 flex flex-col p-3">
                    <div className="text-center mb-2">
                      <span className="text-xs bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-2 py-0.5 rounded-full">Today</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="bg-white rounded-lg p-2 shadow-sm border-l-4 border-[var(--color-forest)]">
                        <p className="text-xs font-medium truncate">Home Depot</p>
                        <p className="text-[10px] text-gray-500">Tools & Supplies</p>
                        <p className="text-xs font-bold text-[var(--color-forest)]">$127.43</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow-sm border-l-4 border-[var(--color-moss)]">
                        <p className="text-xs font-medium truncate">Shell Gas</p>
                        <p className="text-[10px] text-gray-500">Fuel</p>
                        <p className="text-xs font-bold text-[var(--color-forest)]">$58.92</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow-sm border-l-4 border-[var(--color-sage)]">
                        <p className="text-xs font-medium truncate">Office Depot</p>
                        <p className="text-[10px] text-gray-500">Office Supplies</p>
                        <p className="text-xs font-bold text-[var(--color-forest)]">$34.15</p>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-forest)] text-center mt-2">✓ Organized</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-sage)]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)] text-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm sm:text-base mb-6 opacity-90">
            Built for self-employed professionals who&apos;d rather be working than doing bookkeeping
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-70">
            <span className="text-sm font-medium">QuickBooks</span>
            <span className="text-sm font-medium">Xero</span>
            <span className="text-sm font-medium">Excel</span>
            <span className="text-sm font-medium">Google Sheets</span>
            <span className="text-sm font-medium">TurboTax</span>
            <span className="text-sm font-medium">IRS Schedule C</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              The Receipt Problem Is Costing You Thousands
            </h2>
            <p className="text-lg text-[var(--color-charcoal)]/70 max-w-2xl mx-auto">
              Research shows self-employed workers under-claim deductions by 15-30% annually due to lost or miscategorized receipts.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <AnimatedSection delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-forest)]/10">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3 text-[var(--color-charcoal)]">The Shoebox Problem</h3>
              <p className="text-[var(--color-charcoal)]/70">
                Receipts pile up in your truck, wallet, and junk drawer. By February, 40% are crumpled, faded, or completely lost. Every missing receipt is money you&apos;re giving back to the IRS.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-forest)]/10">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3 text-[var(--color-charcoal)]">The Time Drain</h3>
              <p className="text-[var(--color-charcoal)]/70">
                Manual entry takes 5-10 minutes per receipt. At 200+ receipts per year, that&apos;s 15-20 hours of mind-numbing data entry — time you could spend on actual billable work.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-[var(--color-forest)]/10">
              <div className="text-4xl mb-4">🤷</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3 text-[var(--color-charcoal)]">The Category Confusion</h3>
              <p className="text-[var(--color-charcoal)]/70">
                Is that Home Depot purchase &quot;Supplies&quot; or &quot;Equipment&quot;? When you guess wrong, you either pay too much tax or raise red flags for an audit.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Solution (Before/After) Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              From Chaos to Control in Seconds
            </h2>
          </AnimatedSection>
          
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-center">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">Before</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">Receipts crumple in your truck for months, then panic in February when your accountant asks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-[var(--color-forest)]">After</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">Snap a photo at checkout — it&apos;s saved, backed up, and searchable forever</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-center">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">Before</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">Spend 5+ minutes per receipt typing into Excel, squinting at faded ink</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-[var(--color-forest)]">After</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">AI reads and categorizes in 2 seconds — even crumpled receipts with bad handwriting</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-center">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">Before</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">Guess at categories and hope the IRS doesn&apos;t notice the mistakes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-[var(--color-forest)]">After</p>
                    <p className="text-[var(--color-charcoal)]/70 text-sm">AI auto-assigns IRS Schedule C categories with 95%+ designed accuracy</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Everything You Need to Stop Overpaying
            </h2>
            <p className="text-lg text-[var(--color-charcoal)]/70 max-w-2xl mx-auto">
              Designed specifically for contractors, freelancers, and gig workers — not a bloated accounting suite.
            </p>
          </AnimatedSection>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatedSection delay={0.1} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📸</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Instant Receipt Capture</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                Snap a photo with your phone. AI extracts merchant, date, amount, and line items — even from crumpled receipts. So you can capture expenses in 10 seconds.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Smart Tax Categorization</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                AI automatically assigns IRS Schedule C categories based on merchant and purchase type. Designed to eliminate guesswork and reduce audit risk.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Tax-Ready Exports</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                One-click export to Excel, CSV, or PDF. Compatible with QuickBooks, Xero, and TurboTax. So you can hand over clean data instead of a shoebox.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🚗</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Mileage Tracking</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                Log business miles with one tap. IRS standard deduction is $0.67/mile — that&apos;s $350/week for contractors driving 500 miles. <span className="text-[var(--color-forest)] font-medium">Pro plan</span>
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.5} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📅</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Year-Round Dashboard</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                See expenses by category, month, and vendor — not just at tax time. Quarterly tax estimate calculator keeps you prepared. Never surprised in April.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[var(--color-forest)]/10">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold mb-2 text-[var(--color-charcoal)]">Bank-Level Security</h3>
              <p className="text-sm text-[var(--color-charcoal)]/70">
                Your receipt data is encrypted at rest and in transit. We never sell your data or share it with third parties. Your financial information stays yours.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)] text-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold mb-4">
              Three Steps to Tax-Ready Receipts
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              No complicated setup. No training required. Just snap, review, and export.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <AnimatedSection delay={0.1} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <div className="text-sm font-medium text-[var(--color-gold)] mb-2">Step 1</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3">Snap</h3>
              <p className="opacity-80 text-sm">
                Take a photo of any receipt with your phone&apos;s camera. Works with paper receipts, digital receipts, even crumpled ones from the bottom of your toolbox.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <div className="text-sm font-medium text-[var(--color-gold)] mb-2">Step 2</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3">Categorize</h3>
              <p className="opacity-80 text-sm">
                AI reads the receipt and auto-assigns the correct IRS tax category. Review and adjust if needed — you&apos;re always in control.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📥</span>
              </div>
              <div className="text-sm font-medium text-[var(--color-gold)] mb-2">Step 3</div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-3">Export</h3>
              <p className="opacity-80 text-sm">
                When your accountant asks (or tax season arrives), export everything to Excel or PDF with one click. Hand over clean, organized data.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Built for People Like You
            </h2>
            <p className="text-lg text-[var(--color-charcoal)]/70 max-w-2xl mx-auto">
              Here&apos;s how ReceiptSnap would fit into your workflow.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <AnimatedSection delay={0.1} className="bg-[var(--color-cream)] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <p className="font-bold text-[var(--color-charcoal)]">Solo Electrician</p>
                  <p className="text-sm text-[var(--color-charcoal)]/70">Mike</p>
                </div>
              </div>
              <p className="text-[var(--color-charcoal)]/70 text-sm leading-relaxed">
                Mike runs a one-person electrical business. He buys wire, outlets, and tools almost daily, but receipts pile up in his truck console. Last year he missed deducting $3,200 in tool purchases. With ReceiptSnap, he&apos;d snap each receipt right at checkout.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-[var(--color-cream)] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <p className="font-bold text-[var(--color-charcoal)]">Freelance Consultant</p>
                  <p className="text-sm text-[var(--color-charcoal)]/70">Sarah</p>
                </div>
              </div>
              <p className="text-[var(--color-charcoal)]/70 text-sm leading-relaxed">
                Sarah makes $150K/year with client dinners, software subscriptions, and travel. She dumps everything into a folder and dreads tax season. With ReceiptSnap, she&apos;d forward digital receipts via email and her quarterly estimates would be accurate.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="bg-[var(--color-cream)] rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <div>
                  <p className="font-bold text-[var(--color-charcoal)]">Gig Driver</p>
                  <p className="text-sm text-[var(--color-charcoal)]/70">James</p>
                </div>
              </div>
              <p className="text-[var(--color-charcoal)]/70 text-sm leading-relaxed">
                James drives for Uber and DoorDash, logging 600+ miles/week. The $0.67/mile IRS deduction means $400/week in potential savings he&apos;s missing. With ReceiptSnap&apos;s mileage tracking, he&apos;d capture $8,000+ in annual deductions.
              </p>
            </AnimatedSection>
          </div>
          
          <p className="text-center text-sm text-[var(--color-charcoal)]/50 mt-8">
            These are projected use cases based on research data, not testimonials from existing users.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="inline-block bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Planned Launch Pricing
            </span>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Simple Pricing, Serious Savings
            </h2>
            <p className="text-lg text-[var(--color-charcoal)]/70 max-w-2xl mx-auto">
              Choose the plan that fits your workflow. All plans include a 30-day free trial.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.1} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[var(--color-forest)]/10">
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-2 text-[var(--color-charcoal)]">Basic</h3>
              <p className="text-[var(--color-charcoal)]/70 text-sm mb-4">For occasional receipt tracking</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--color-charcoal)]">$19</span>
                <span className="text-[var(--color-charcoal)]/70">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> 100 receipts/month
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> AI categorization
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Excel/CSV export
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Email support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center border-2 border-[var(--color-forest)] text-[var(--color-forest)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest)] hover:text-white transition-colors">
                Join Waitlist
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-[var(--color-forest)] rounded-2xl p-6 md:p-8 shadow-xl text-white relative transform md:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[var(--color-gold)] text-[var(--color-charcoal)] px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-2">Pro</h3>
              <p className="opacity-80 text-sm mb-4">For busy contractors & freelancers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$39</span>
                <span className="opacity-70">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm opacity-90">
                  <span>✓</span> 500 receipts/month
                </li>
                <li className="flex items-center gap-2 text-sm opacity-90">
                  <span>✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-2 text-sm opacity-90">
                  <span>✓</span> Mileage tracking
                </li>
                <li className="flex items-center gap-2 text-sm opacity-90">
                  <span>✓</span> Quarterly tax estimates
                </li>
                <li className="flex items-center gap-2 text-sm opacity-90">
                  <span>✓</span> Priority support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center bg-white text-[var(--color-forest)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-cream)] transition-colors">
                Join Waitlist
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[var(--color-forest)]/10">
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold mb-2 text-[var(--color-charcoal)]">Business</h3>
              <p className="text-[var(--color-charcoal)]/70 text-sm mb-4">For high-volume professionals</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--color-charcoal)]">$69</span>
                <span className="text-[var(--color-charcoal)]/70">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Unlimited receipts
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Multi-user (up to 3)
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> QuickBooks/Xero sync
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]/70">
                  <span className="text-[var(--color-forest)]">✓</span> Dedicated support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center border-2 border-[var(--color-forest)] text-[var(--color-forest)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-forest)] hover:text-white transition-colors">
                Join Waitlist
              </a>
            </AnimatedSection>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <AnimatedSection className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-[var(--color-charcoal)] mb-4">Pricing FAQs</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">When will ReceiptSnap launch?</p>
                  <p className="text-[var(--color-charcoal)]/70">We&apos;re targeting Q1 2026. Join the waitlist to be notified the moment we&apos;re ready.</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">Will there be a free trial?</p>
                  <p className="text-[var(--color-charcoal)]/70">Yes — all waitlist members get 30 days free when we launch.</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">Can I cancel anytime?</p>
                  <p className="text-[var(--color-charcoal)]/70">Absolutely. No contracts, no cancellation fees. Cancel with one click.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          
          <div className="space-y-4">
            {[
              {
                q: "How accurate is the AI categorization?",
                a: "Our AI is designed to achieve 95%+ accuracy on common expense categories (Supplies, Fuel, Meals, Travel, etc.). You can always review and adjust any category before exporting — you're in control."
              },
              {
                q: "Does it work with crumpled or faded receipts?",
                a: "Yes. Our OCR technology is trained on real-world receipts — crumpled, coffee-stained, faded ink, even handwritten notes. If you can read it, we can usually read it too."
              },
              {
                q: "Can I import receipts I've already photographed?",
                a: "Absolutely. Upload photos from your camera roll and we'll process them just like new captures. Great for catching up on months of backlog."
              },
              {
                q: "Is my data secure?",
                a: "Your receipt data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell your data or share it with third parties. You can export and delete your data at any time."
              },
              {
                q: "What if I use QuickBooks or Xero?",
                a: "Our Business plan includes direct integration with QuickBooks and Xero. For Basic and Pro plans, you can export to CSV and import manually — takes 2 minutes."
              },
              {
                q: "How is this different from Expensify or QuickBooks Self-Employed?",
                a: "We're built specifically for solo contractors who want dead-simple receipt tracking — not a full accounting suite. No team features you don't need, no complicated setup. Just snap, categorize, export."
              },
              {
                q: "What happens if I exceed my monthly receipt limit?",
                a: "You'll get a notification when you're approaching your limit. You can upgrade to a higher plan anytime, or wait until next month when your limit resets."
              },
              {
                q: "When does ReceiptSnap launch?",
                a: "We're targeting Q1 2026. Join the waitlist to get early access and lock in launch pricing before it increases."
              }
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05} className="bg-white rounded-xl p-6 shadow-md border border-[var(--color-forest)]/10">
                <h3 className="font-medium text-[var(--color-charcoal)] mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--color-charcoal)]/70">{faq.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-moss)] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-bold mb-6">
              Be One of the First to Stop Overpaying Taxes
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              We&apos;re building ReceiptSnap for contractors, freelancers, and gig workers who are tired of the receipt chaos. Join the waitlist and get 30 days free when we launch.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-[var(--color-charcoal)] focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[var(--color-gold)] text-[var(--color-charcoal)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)]/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? "Joining..." : "Get Early Access"}
              </button>
            </form>
            {submitMessage && (
              <p className={`mt-3 text-sm ${submitMessage.includes("list") ? "text-white" : "text-[var(--color-coral)]"}`}>
                {submitMessage}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-charcoal)] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-[family-name:var(--font-fraunces)] font-bold mb-4">ReceiptSnap AI</h4>
              <p className="text-sm text-white/70">
                AI-powered receipt tracking for self-employed professionals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X / Twitter</a></li>
                <li><a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Product Hunt</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            © 2026 ReceiptSnap AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-t border-[var(--color-forest)]/10 md:hidden z-40">
        <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)] text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}