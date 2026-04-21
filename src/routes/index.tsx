import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AI Nova Club — Build. Monetize. Dominate." },
      { name: "description", content: "Join the exclusive network of high-performing Instagram pages in AI, business, and luxury niches. Get brand deals, monetize your pages, and grow." },
    ],
  }),
});

const JOTFORM_URL = "https://form.jotform.com/YOUR_FORM_ID";

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
      { threshold: 0.08 }
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
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[2px]"} ${className}`}
    >
      {children}
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

function GlassCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const { ref, handleMove } = useMouseGlow();
  return (
    <Section delay={delay}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="group relative p-8 sm:p-10 rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-foreground/15"
        style={{
          background: "linear-gradient(135deg, oklch(0.12 0 0 / 80%), oklch(0.08 0 0 / 60%))",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), oklch(1 0 0 / 4%), transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="text-3xl mb-5">{icon}</div>
          <h3 className="text-lg font-semibold mb-3 tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </Section>
  );
}

function Index() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-sm font-semibold tracking-tight">AI Nova Club</span>
          </div>
          <a
            href={JOTFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide px-5 py-2.5 rounded-full border border-border hover:bg-foreground/5 transition-all duration-300"
          >
            Apply Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{
              background: "radial-gradient(circle, oklch(0.7 0.15 270), transparent 70%)",
              animation: "gradient-shift 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, oklch(0.6 0.1 200), transparent 70%)",
              animation: "gradient-shift 25s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
            style={{
              background: "radial-gradient(circle, oklch(0.8 0.1 330), transparent 70%)",
              animation: "gradient-shift 18s ease-in-out infinite 3s",
            }}
          />
        </div>
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(oklch(1 0 0 / 5%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 5%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm mb-10">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "oklch(0.7 0.18 145)" }} />
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Now Accepting Applications</span>
            </div>
          </div>

          <h1 className={`text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="block">Build.</span>
            <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent">Monetize.</span>
            <span className="block">Dominate.</span>
          </h1>

          <p className={`text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Join AI Nova Club — an exclusive network of high-performing Instagram pages in AI, business, and luxury niches.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a
              href={JOTFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_oklch(1_0_0_/_15%)]"
              style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
            >
              <span className="relative z-10">Apply Now</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#learn-more" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1">
              Learn more
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: "float 3s ease-in-out infinite" }}>
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-muted-foreground/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="learn-more" className="py-28 sm:py-40 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <Section>
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-20">Trusted by growing creators</p>
        </Section>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 sm:gap-16">
          {[
            { value: "50+", label: "Pages", sublabel: "In the network" },
            { value: "1M+", label: "Reach", sublabel: "Combined monthly" },
            { value: "500K+", label: "Followers", sublabel: "Total audience" },
          ].map((s, i) => (
            <Section key={s.label} delay={i * 200}>
              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-foreground text-sm font-medium mt-3">{s.label}</div>
                <div className="text-muted-foreground text-xs mt-1">{s.sublabel}</div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-28 sm:py-40 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <Section>
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Benefits</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-5">Why AI Nova Club?</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">Everything you need to turn your page into a revenue machine.</p>
          </div>
        </Section>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 sm:gap-5">
          <GlassCard icon="💼" title="Brand Deals Access" desc="Get connected with brands looking for creators in your niche. We source, negotiate, and bring deals directly to you." delay={0} />
          <GlassCard icon="💰" title="Monetization Opportunities" desc="Multiple revenue streams — from sponsored posts and affiliate partnerships to exclusive paid promotions." delay={120} />
          <GlassCard icon="🔗" title="Private Network" desc="Join a curated community of top-performing creators who share strategies, insights, and collaboration opportunities." delay={240} />
          <GlassCard icon="📈" title="Growth Systems" desc="Proven frameworks and insider tactics to scale your reach, engagement, and follower count consistently." delay={360} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 sm:py-40 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <Section>
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Process</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter">How It Works</h2>
          </div>
        </Section>
        <div className="max-w-4xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid sm:grid-cols-3 gap-16 sm:gap-8">
            {[
              { step: "01", title: "Apply", desc: "Fill out a quick application to tell us about your page and goals.", icon: "✦" },
              { step: "02", title: "Get Approved", desc: "Our team reviews your profile and welcomes qualified creators within 48 hours.", icon: "✦" },
              { step: "03", title: "Start Earning", desc: "Access brand deals, grow your page, and start monetizing immediately.", icon: "✦" },
            ].map((s, i) => (
              <Section key={s.step} delay={i * 200}>
                <div className="text-center relative">
                  <div className="w-12 h-12 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 text-xs font-mono text-muted-foreground">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto">{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusivity */}
      <section className="py-28 sm:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.7 0.15 270), transparent 60%)",
          }}
        />
        <Section>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm mb-10">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Exclusive Access</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-6">
              Not everyone<br />gets in.
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed mb-10">
              We maintain a high standard. Every member is vetted to ensure quality, commitment, and mutual growth for the entire network.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-foreground/40" />
                <span>Curated Members</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-foreground/40" />
                <span>Quality Control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-foreground/40" />
                <span>Vetted Creators</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <section className="py-36 sm:py-52 px-6 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, oklch(0.7 0.15 270), transparent 60%)" }}
          />
        </div>
        <Section>
          <div className="text-center relative z-10">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-6">Ready to Join?</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">Your next chapter starts with one application.</p>
            <a
              href={JOTFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-medium rounded-full text-base tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_oklch(1_0_0_/_20%)]"
              style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
            >
              <span className="relative z-10">Apply Now</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <span className="text-sm font-semibold tracking-tight">AI Nova Club</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                Instagram
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} AI Nova Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
