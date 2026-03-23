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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-b border-[var(--color-forest)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-mint)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RS</span>
              </div>
              <span className="font-[var(--font-display)] font-bold text-xl text-[var(--color-forest)]">ReceiptSnap</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">Features</a>
              <a href="#pricing" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">Pricing</a>
              <a href="#faq" className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors text-sm font-medium">FAQ</a>
              <a href="#waitlist" className="bg-[var(--color-forest)] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[var(--color-sage)] transition-colors text-sm">Join Waitlist</a>
            </div>

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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--color-warm-white)] border-t border-[var(--color-forest)]/10 py-4 px-4">
            <div className="flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors font-medium">Features</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors font-medium">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-slate)] hover:text-[var(--color-forest)] transition-colors font-medium">FAQ</a>
              <a href="#waitlist" onClick={() => setMobileMenuOpen(false)} className="bg-[var(--color-forest)] text-white px-5 py-3 rounded-lg font-semibold text-center">Join Waitlist</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroSection.ref} className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${heroSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-2 bg-[var(--color-mint)]/10 text-[var(--color-sage)] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-[var(--color-mint)] rounded-full animate-pulse"></span>
                Early Access Available Now
              </div>
              
              <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-forest)] leading-tight mb-6">
                Stop Overpaying Taxes on Your Contractor Income
              </h1>
              
              <p className="text-lg sm:text-xl text-[var(--color-slate)] mb-8 leading-relaxed">
                Self-employed professionals miss <span className="text-[var(--color-forest)] font-semibold">$1,200+ in tax deductions</span> every year because receipts get lost, crumpled, or forgotten. ReceiptSnap AI turns any receipt photo into a tax-ready spreadsheet in seconds.
              </p>
              
              <form onSubmit={handleSubmit} id="waitlist" className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-[var(--color-forest)]/20 focus:border-[var(--color-mint)] focus:outline-none text-[var(--color-charcoal)] bg-white transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-forest)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-sage)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap animate-pulse-glow"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
              
              {submitStatus === "success" && (
                <p className="text-[var(--color-mint)] font-medium mb-4">You&apos;re on the list! Check your email for next steps.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 font-medium mb-4">Something went wrong. Please try again.</p>
              )}
              
              <p className="text-sm text-[var(--color-slate)]">
                Be one of the first 500 contractors to try it free • No credit card required
              </p>
            </div>
            
            <div className={`relative ${heroSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="relative bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-warm-white)] rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {/* Before Phone */}
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">The Chaos</div>
                    <div className="bg-[var(--color-charcoal)] rounded-2xl p-3 shadow-xl">
                      <div className="bg-gray-800 rounded-xl p-2 space-y-2">
                        <div className="h-12 bg-gray-600/50 rounded-lg transform rotate-2"></div>
                        <div className="h-10 bg-gray-500/50 rounded-lg transform -rotate-1"></div>
                        <div className="h-14 bg-gray-600/50 rounded-lg transform rotate-3"></div>
                        <div className="h-8 bg-gray-500/50 rounded-lg"></div>
                        <div className="h-12 bg-gray-600/50 rounded-lg transform -rotate-2"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* After Phone */}
                  <div className="relative animate-float">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-mint)] text-white text-xs font-bold px-3 py-1 rounded-full">Organized</div>
                    <div className="bg-[var(--color-charcoal)] rounded-2xl p-3 shadow-xl">
                      <div className="bg-white rounded-xl p-2 space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-xs font-medium text-[var(--color-charcoal)]">Supplies</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[var(--color-forest)]">$847</span>
                            <span className="text-green-500">✓</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-xs font-medium text-[var(--color-charcoal)]">Fuel</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[var(--color-forest)]">$234</span>
                            <span className="text-green-500">✓</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-xs font-medium text-[var(--color-charcoal)]">Tools</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[var(--color-forest)]">$1,203</span>
                            <span className="text-green-500">✓</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-xs font-medium text-[var(--color-charcoal)]">Meals</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[var(--color-forest)]">$156</span>
                            <span className="text-green-500">✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--color-gold)]/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-[var(--color-mint)]/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section ref={credibilitySection.ref} className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)]">
        <div className={`max-w-7xl mx-auto ${credibilitySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-center text-[var(--color-forest)] font-medium mb-8">
            Built for self-employed contractors, freelancers, and gig workers managing $30K-$500K in annual income
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-8">
            <div className="flex items-center gap-2 text-[var(--color-slate)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span className="text-sm font-medium">QuickBooks Export</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-slate)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span className="text-sm font-medium">Excel/CSV Export</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-slate)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <span className="text-sm font-medium">TurboTax Compatible</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-slate)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm font-medium">IRS Schedule C</span>
            </div>
          </div>
          
          <p className="text-center text-[var(--color-charcoal)] text-sm">
            <span className="font-semibold">93% of self-employed workers</span> don&apos;t track all deductible expenses — costing them an average of <span className="font-semibold text-[var(--color-forest)]">$1,200+ annually</span> in overpaid taxes.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemSection.ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${problemSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-4">
              Sound Familiar?
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              Every self-employed person knows these struggles. Here&apos;s what&apos;s costing you money.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:shadow-xl transition-shadow ${problemSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧾</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-4">
                Receipts Disappear Into the Void
              </h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                You buy tools at Home Depot, materials at Lowe&apos;s, fuel at Shell — and the receipts end up crumpled in your truck console, faded in your wallet, or lost in a camera roll of 10,000 photos. <span className="font-semibold text-[var(--color-charcoal)]">40% of business receipts are lost before tax season</span>, costing the average contractor $480+ in missed deductions.
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:shadow-xl transition-shadow ${problemSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">😰</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-4">
                Your Accountant Asks, You Scramble
              </h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Every February, your accountant sends the dreaded email: &quot;I need all your business expenses categorized by type.&quot; You spend <span className="font-semibold text-[var(--color-charcoal)]">15-20 hours</span> digging through photos, bank statements, and memory — trying to remember if that $347 charge was for tools or personal groceries.
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:shadow-xl transition-shadow ${problemSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-gold)]/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💸</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-4">
                You Pay More Than You Owe
              </h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Without organized receipts, you miss legitimate deductions: the mileage to job sites, the work boots, the phone bill, the home office supplies. The IRS doesn&apos;t remind you of deductions you forgot — they just take your money. Self-employed workers overpay an average of <span className="font-semibold text-[var(--color-charcoal)]">$1,200/year</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionSection.ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${solutionSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Before vs. After ReceiptSnap
            </h2>
            <p className="text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
              See how receipt tracking transforms from your biggest headache to a 10-second habit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${solutionSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="bg-red-500/20 rounded-xl p-6 mb-4">
                <p className="text-red-200 font-medium mb-2">❌ Before</p>
                <p className="text-white/90">Receipts crumple in your truck for months, fade to illegible white, get thrown away with fast food wrappers</p>
              </div>
              <div className="bg-[var(--color-mint)]/20 rounded-xl p-6">
                <p className="text-[var(--color-mint)] font-medium mb-2">✅ After</p>
                <p className="text-white/90">Snap a photo in 10 seconds at checkout — it&apos;s saved forever, readable even if the paper fades</p>
              </div>
            </div>
            
            <div className={`${solutionSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="bg-red-500/20 rounded-xl p-6 mb-4">
                <p className="text-red-200 font-medium mb-2">❌ Before</p>
                <p className="text-white/90">Spend 15+ hours in February sorting through photos, guessing categories, and manually typing into Excel</p>
              </div>
              <div className="bg-[var(--color-mint)]/20 rounded-xl p-6">
                <p className="text-[var(--color-mint)] font-medium mb-2">✅ After</p>
                <p className="text-white/90">AI reads and categorizes every receipt automatically — export a clean spreadsheet in one click when your accountant asks</p>
              </div>
            </div>
            
            <div className={`${solutionSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="bg-red-500/20 rounded-xl p-6 mb-4">
                <p className="text-red-200 font-medium mb-2">❌ Before</p>
                <p className="text-white/90">Miss $500-2,000 in legitimate deductions because you can&apos;t find or remember all your business expenses</p>
              </div>
              <div className="bg-[var(--color-mint)]/20 rounded-xl p-6">
                <p className="text-[var(--color-mint)] font-medium mb-2">✅ After</p>
                <p className="text-white/90">Every expense is captured, categorized, and ready for Schedule C — designed to help you find every deduction you&apos;ve earned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSection.ref} id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${featuresSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-4">
              Everything You Need to Stop Overpaying
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              AI-powered features designed specifically for self-employed professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">AI-Powered OCR</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Reads any receipt — even crumpled, faded, or handwritten. Extracts merchant, date, amount, and line items with 95%+ accuracy.
              </p>
            </div>
            
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">Smart Tax Categorization</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Auto-sorts into IRS Schedule C categories: Supplies, Tools, Fuel, Meals, Vehicle Expenses, Home Office, and more. Learns your patterns.
              </p>
            </div>
            
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">📤</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">One-Click Export</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Generate a clean CSV or PDF organized by category, date, and amount. Compatible with QuickBooks, Excel, TurboTax, and any accounting software.
              </p>
            </div>
            
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">Year-Round Tracking</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                See expenses by week, month, or quarter. Get alerts when you&apos;re spending more than usual. Know your profit margins in real-time.
              </p>
            </div>
            
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">Mileage Integration</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                IRS allows $0.67/mile deduction. Track every drive to job sites automatically. 500 miles/week = $17,000+ in annual deductions.
              </p>
            </div>
            
            <div className={`group bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-forest)]/5 hover:border-[var(--color-mint)]/50 transition-all ${featuresSection.isVisible ? "animate-fade-in-up delay-600" : "opacity-0"}`}>
              <div className="w-14 h-14 bg-[var(--color-mint)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-mint)]/20 transition-colors">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-3">Bank-Level Security</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                256-bit encryption, SOC 2 compliant infrastructure. We never access your bank accounts — only the receipts you upload. Delete data anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksSection.ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${howItWorksSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              Three steps. Under 60 seconds. Done.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className={`text-center ${howItWorksSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="w-20 h-20 bg-[var(--color-forest)] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-forest)] mb-3">Snap</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Take a photo of any receipt at checkout, in your truck, or at your desk. Our mobile-optimized upload handles any image quality.
              </p>
            </div>
            
            <div className={`text-center ${howItWorksSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="w-20 h-20 bg-[var(--color-sage)] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-forest)] mb-3">Categorize</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                Within 2 seconds, AI extracts all the data and assigns it to the right tax category. Review and adjust if needed.
              </p>
            </div>
            
            <div className={`text-center ${howItWorksSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="w-20 h-20 bg-[var(--color-mint)] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-forest)] mb-3">Export</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">
                One click generates a clean spreadsheet with all expenses organized by category. Email it, download it, or sync to your accounting software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesSection.ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${useCasesSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-4">
              Built for People Like You
            </h2>
            <p className="text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
              See how different self-employed professionals would use ReceiptSnap.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-orange-100 ${useCasesSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-forest)]">Solo Electrician</h3>
                  <p className="text-sm text-[var(--color-slate)]">25+ receipts/week, 1,300+/year</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-600 mb-1">Without ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">Stuffs receipts in glove box. Spends two Sundays in February typing into Excel. Misses $800-1,200 in deductions.</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-[var(--color-mint)] mb-1">With ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">Snaps each receipt at checkout. Exports in 30 seconds at tax time. Projected to find <span className="font-bold">$3,200 in additional deductions</span>.</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-indigo-100 ${useCasesSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-forest)]">Freelance Consultant</h3>
                  <p className="text-sm text-[var(--color-slate)]">Software, travel, home office</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-600 mb-1">Without ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">47 browser tabs of subscription receipts. A folder of unorganized photos. No idea what she spent last year.</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-[var(--color-mint)] mb-1">With ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">Forwards email receipts, snaps physical ones. AI categorizes automatically. <span className="font-bold">Quarterly tax estimates are finally accurate</span>.</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-emerald-100 ${useCasesSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-forest)]">Gig Economy Driver</h3>
                  <p className="text-sm text-[var(--color-slate)]">Mileage, gas, phone, car washes</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-600 mb-1">Without ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">No system. Guesses mileage at tax time. Claims 60% of actual miles. Leaving $8,000+ in deductions on the table.</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <p className="text-sm font-medium text-[var(--color-mint)] mb-1">With ReceiptSnap</p>
                  <p className="text-sm text-[var(--color-charcoal)]">Logs mileage automatically. Snaps gas receipts. Complete record at tax time. <span className="font-bold">Tax bill drops by $2,100</span>.</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-[var(--color-slate)] mt-8 italic">
            These are projected use cases based on research data and user interviews, not testimonials from existing customers.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingSection.ref} id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-forest)]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${pricingSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 bg-[var(--color-mint)]/20 text-[var(--color-mint)] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Planned Launch Pricing — Early Access Available Now
            </div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
              Pay less than you&apos;d lose in missed deductions. Save 20% with annual billing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {/* Starter Plan */}
            <div className={`bg-white rounded-2xl p-8 ${pricingSection.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[var(--color-forest)]">$19</span>
                <span className="text-[var(--color-slate)]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> 100 receipts/month
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> AI categorization
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> CSV/PDF export
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Mobile app access
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Email support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-sage)] transition-colors">
                Join Waitlist
              </a>
            </div>
            
            {/* Pro Plan */}
            <div className={`bg-white rounded-2xl p-8 ring-2 ring-[var(--color-mint)] relative ${pricingSection.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-mint)] text-white text-sm font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[var(--color-forest)]">$39</span>
                <span className="text-[var(--color-slate)]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Everything in Starter
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> <strong>Unlimited</strong> receipts
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Mileage tracking
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Quarterly tax estimates
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> QuickBooks integration
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Priority support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center bg-[var(--color-mint)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-sage)] transition-colors">
                Join Waitlist
              </a>
            </div>
            
            {/* Business Plan */}
            <div className={`bg-white rounded-2xl p-8 ${pricingSection.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-forest)] mb-2">Business</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[var(--color-forest)]">$69</span>
                <span className="text-[var(--color-slate)]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Multiple businesses
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Team members (up to 3)
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Custom categories
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> API access
                </li>
                <li className="flex items-center gap-3 text-[var(--color-charcoal)]">
                  <span className="text-[var(--color-mint)]">✓</span> Dedicated support
                </li>
              </ul>
              <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-sage)] transition-colors">
                Join Waitlist
              </a>
            </div>
          </div>
          
          {/* Pricing FAQs */}
          <div className={`mt-16 grid md:grid-cols-3 gap-8 ${pricingSection.isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">When does ReceiptSnap launch?</h4>
              <p className="text-[var(--color-mint)] text-sm">Early access is available now. Full public launch is planned for Q1 2026.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">Will there be a free trial?</h4>
              <p className="text-[var(--color-mint)] text-sm">Yes! Early access members get free usage through April 2026. No credit card required.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-[var(--color-mint)] text-sm">Absolutely. No contracts, no commitment. Cancel with one click if it&apos;s not saving you time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref} id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 ${faqSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-forest)] mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "How accurate is the AI at reading receipts?",
                a: "The AI is designed to achieve 95%+ accuracy on standard printed receipts. For unusual formats (handwritten, faded, or damaged), accuracy may be lower, but you can always manually correct any errors. The system learns from your corrections to improve over time."
              },
              {
                q: "What if I'm already using QuickBooks or Expensify?",
                a: "ReceiptSnap is designed to complement your existing workflow. Export to CSV and import into QuickBooks, or use our direct QuickBooks integration (Pro plan). Many users find ReceiptSnap simpler for receipt capture while keeping QuickBooks for full accounting."
              },
              {
                q: "Is my data secure?",
                a: "Yes. We use 256-bit encryption, store data on SOC 2 compliant infrastructure (Supabase), and never access your bank accounts or financial data. You can delete all your data with one click at any time."
              },
              {
                q: "What happens if I miss a receipt?",
                a: "You can upload photos retroactively anytime — even photos from months ago in your camera roll. The AI will read the date from the receipt, not the upload date. We also support email forwarding for digital receipts."
              },
              {
                q: "Do I need an accountant to use this?",
                a: "No. ReceiptSnap is built for self-employed people who do their own taxes with TurboTax, H&R Block, or similar software. The export format uses standard IRS Schedule C categories. If you have an accountant, they'll love getting a clean spreadsheet instead of a shoebox of receipts."
              },
              {
                q: "How is this different from Expensify or QuickBooks Self-Employed?",
                a: "ReceiptSnap is designed specifically for solo self-employed workers (not teams), with a simpler interface and lower price. Expensify is built for enterprise expense reports. QuickBooks Self-Employed bundles receipt tracking with full accounting software. If you just want dead-simple receipt → tax category, ReceiptSnap is built for you."
              },
              {
                q: "Can I track mileage too?",
                a: "Yes, on the Pro plan and above. Log trips manually or use automatic GPS tracking. The IRS standard mileage deduction ($0.67/mile in 2025) can add up to $10,000+ in annual deductions for contractors who drive to job sites."
              },
              {
                q: "When does ReceiptSnap launch?",
                a: "We're in early access now. Full public launch is planned for Q1 2026. Join the waitlist to get immediate early access and lock in founding member pricing."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-xl p-6 shadow-sm border border-[var(--color-forest)]/5 ${faqSection.isVisible ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <h3 className="font-[var(--font-display)] font-bold text-[var(--color-forest)] mb-3">{faq.q}</h3>
                <p className="text-[var(--color-slate)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={finalCtaSection.ref} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-sage)]">
        <div className={`max-w-4xl mx-auto text-center ${finalCtaSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Stop Overpaying Taxes?
          </h2>
          <p className="text-xl text-[var(--color-mint)] mb-8 max-w-2xl mx-auto">
            Join contractors, freelancers, and gig workers who are already tracking receipts the smart way. Early access is free through April 2026 — no credit card required.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl border-2 border-white/20 focus:border-[var(--color-mint)] focus:outline-none text-[var(--color-charcoal)] bg-white transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-gold)] text-[var(--color-forest)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-gold)]/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? "Joining..." : "Join Now"}
            </button>
          </form>
          
          {submitStatus === "success" && (
            <p className="text-[var(--color-mint)] font-medium mb-4">You&apos;re on the list! Check your email for next steps.</p>
          )}
          
          <p className="text-white/70 text-sm italic">
            &quot;You&apos;re building something for people exactly like me — finally.&quot; — Early access member feedback
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[var(--color-mint)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RS</span>
                </div>
                <span className="font-[var(--font-display)] font-bold text-xl text-white">ReceiptSnap</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered receipt tracking for self-employed professionals. Stop overpaying taxes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© 2026 ReceiptSnap AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Product Hunt">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803c2.319 0 4.2 1.88 4.2 4.2 0 2.321-1.881 4.2-4.2 4.2z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-warm-white)]/95 backdrop-blur-sm border-t border-[var(--color-forest)]/10 md:hidden z-40">
        <a href="#waitlist" className="block w-full text-center bg-[var(--color-forest)] text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
          Join the Waitlist
        </a>
      </div>
    </main>
  );
}