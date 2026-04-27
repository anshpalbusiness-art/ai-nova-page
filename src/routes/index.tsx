import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Zap, TrendingUp, Users, Rocket, Shield, Crown, ArrowRight, Star, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AI Nova Club — Build. Monetize. Dominate." },
      { name: "description", content: "Join the exclusive network of high-performing Instagram pages in AI, business, and luxury niches. Get brand deals, monetize your pages, and grow." },
    ],
  }),
});

const benefits = [
  { icon: Zap, title: "Instant Brand Deals", desc: "Direct access to paid collaborations with top brands in AI & tech niches" },
  { icon: TrendingUp, title: "Revenue Systems", desc: "Proven monetization frameworks that convert followers to consistent income" },
  { icon: Users, title: "Elite Network", desc: "Connect with top 1% creators sharing insider strategies daily" },
  { icon: Rocket, title: "Growth Engine", desc: "Scale from 10K to 100K+ with battle-tested growth systems" },
];

const stats = [
  { value: "50+", label: "Elite Pages", desc: "Curated network" },
  { value: "2M+", label: "Monthly Reach", desc: "Organic impressions" },
  { value: "$500K+", label: "Revenue Generated", desc: "For members" },
  { value: "95%", label: "Success Rate", desc: "Approved members" },
];

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ willChange: "opacity, transform", transform: "translateZ(0)", contain: "layout style paint" }}
    >
      {children}
    </div>
  );
}

function StaggerContainer({ children, className = "", staggerDelay = 100 }: { children: React.ReactNode; className?: string; staggerDelay?: number }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={className}>
      {childrenArray.map((child, i) => (
        <div key={i} style={{ animationDelay: `${i * staggerDelay}ms` }} className="animate-fade-in-up">
          {child}
        </div>
      ))}
    </div>
  );
}

function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
  return { ref, handleMove };
}

function GlassCard({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) {
  const { ref, handleMove } = useMouseGlow();
  return (
    <Section delay={delay}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="group relative p-8 lg:p-10 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 h-full"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 50%)",
          }}
        />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7 text-white/70" />
          </div>
          <h3 className="text-xl font-semibold mb-3 tracking-tight text-white">{title}</h3>
          <p className="text-white/50 text-[15px] leading-relaxed">{desc}</p>
        </div>
      </div>
    </Section>
  );
}

function StatCard({ value, label, desc, delay }: { value: string; label: string; desc: string; delay: number }) {
  return (
    <Section delay={delay}>
      <div className="relative h-full flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm group hover:border-white/15 transition-all duration-500">
        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-3 leading-none">{value}</div>
          <div className="text-white font-medium text-base mb-1">{label}</div>
          <div className="text-white/40 text-sm">{desc}</div>
        </div>
      </div>
    </Section>
  );
}

function Index() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let rafId: number;
    let pendingX = 50;
    let pendingY = 50;
    const handleMouseMove = (e: MouseEvent) => {
      pendingX = (e.clientX / window.innerWidth) * 100;
      pendingY = (e.clientY / window.innerHeight) * 100;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: pendingX, y: pendingY });
          rafId = 0;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
        {/* Large floating orbs - optimized with will-change */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.06] blur-[100px] animate-float-slow will-change-transform" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[50%] h-[50%] rounded-full bg-white/[0.05] blur-[80px] animate-float-slow-reverse will-change-transform" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-white/[0.04] blur-[60px] animate-float-medium will-change-transform" />
        {/* Small particles - reduced count */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-white/30 animate-twinkle will-change-opacity" />
        <div className="absolute top-[70%] left-[25%] w-1 h-1 rounded-full bg-white/25 animate-twinkle will-change-opacity" style={{ animationDelay: '2s' }} />
        {/* Subtle vertical line - single optimized */}
        <div className="absolute left-[50%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-line-drift will-change-transform" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">AI Nova Club</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#benefits" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors duration-300">Benefits</a>
            <a href="#stats" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors duration-300">Results</a>
            <a
              href="/apply"
              className="text-sm font-medium tracking-wide px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300"
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 pt-20">
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60"></span>
              </span>
              <span className="text-xs tracking-[0.12em] uppercase text-white/40">Now Accepting Applications</span>
            </div>
          </div>

          <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-white">Build.</span>{" "}
            <span className="text-white">Monetize.</span>{" "}
            <span className="text-white">Dominate.</span>
          </h1>

          <p className={`text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Join the most exclusive network of high-performing Instagram pages in AI, business & luxury niches. Turn your audience into income.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a
              href="/apply"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-semibold rounded-full text-base tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a href="#benefits" className="text-base text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 px-6 py-5">
              See benefits
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Trust badges */}
          <div className={`mt-16 flex flex-wrap items-center justify-center gap-8 transition-all duration-1000 delay-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { icon: Shield, text: "Vetted Network" },
              { icon: Crown, text: "Exclusive Access" },
              { icon: Star, text: "5-Star Results" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/40 text-sm">
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-3">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-24 sm:py-32 px-6 sm:px-10 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none animate-float-slow" />
        <Section>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">Proven Results</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Numbers That Matter</h2>
          </div>
        </Section>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} desc={s.desc} delay={i * 150} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 sm:py-32 px-6 sm:px-10 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none animate-float-medium" />
        <Section>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">Why Join</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">Everything You Need to Scale</h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">Turn your Instagram page into a revenue-generating machine with our proven system.</p>
          </div>
        </Section>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <GlassCard key={b.title} icon={b.icon} title={b.title} desc={b.desc} delay={i * 150} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none animate-float-slow-reverse" />
        <Section>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">How to Join</h2>
          </div>
        </Section>
        <div className="max-w-5xl mx-auto relative">
          <div className="hidden sm:block absolute top-[32px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Section>
            <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
              {[
                { step: "01", title: "Apply", desc: "Fill out our quick application. Tell us about your page & goals.", icon: "🚀" },
                { step: "02", title: "Get Approved", desc: "Our team reviews & welcomes qualified creators within 48 hours.", icon: "✓" },
                { step: "03", title: "Start Earning", desc: "Access brand deals, growth strategies & monetize immediately.", icon: "💎" },
              ].map((s, i) => (
                <div key={s.step} className="text-center relative group" style={{ animationDelay: `${i * 200}ms` }}>
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <div className="text-white/40 text-xs font-mono mb-3">{s.step}</div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight text-white">{s.title}</h3>
                  <p className="text-white/50 text-[15px] leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Exclusivity */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none animate-float-slow" />
        <Section>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-10">
              <Crown className="w-4 h-4 text-white/60" />
              <span className="text-sm tracking-[0.15em] uppercase text-white/50">Exclusive Access</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-7 text-white">
              Not everyone<br /><span className="text-white/80">gets in.</span>
            </h2>
            <p className="text-white/50 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed mb-12">
              We maintain a high standard. Every member is vetted to ensure quality, commitment, and mutual growth for the entire network.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-[15px]">
              {[
                { text: "Curated Members", color: "bg-white" },
                { text: "Quality Control", color: "bg-white" },
                { text: "Vetted Creators", color: "bg-white" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/40">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.color}/40`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-36 px-6 sm:px-10 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] animate-float-slow" />
        </div>
        <Section>
          <div className="text-center relative z-10">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-7 text-white">Ready to Transform?</h2>
            <p className="text-white/50 text-lg sm:text-xl mb-12 max-w-lg mx-auto leading-relaxed">Your next chapter starts with one application. Join the elite network today.</p>
            <a
              href="/apply"
              className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-semibold rounded-full text-lg tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
            <p className="mt-6 text-white/30 text-sm">Limited spots available for this cohort</p>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 sm:px-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">AI Nova Club</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/40">
              <a href="https://www.instagram.com/ainovaclub.network/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                Instagram
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-white/20">
            © {new Date().getFullYear()} AI Nova Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
