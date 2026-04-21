import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, oklch(0.25 0 0) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.15 0 0) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="relative text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Exclusive Creator Network</p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Build.<br />Monetize.<br />Dominate.
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Join AI Nova Club — an exclusive network of high-performing Instagram pages in AI, business, and luxury niches.
          </p>
          <a
            href={JOTFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity"
            style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
          >
            Apply Now
          </a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 sm:py-32 px-6">
        <Section>
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-16">Trusted by growing creators</p>
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 sm:gap-12">
            {[
              { value: "50+", label: "Pages" },
              { value: "1M+", label: "Reach" },
              { value: "500K+", label: "Followers" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-5xl font-bold tracking-tight">{s.value}</div>
                <div className="text-muted-foreground text-sm mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Value Props */}
      <section className="py-24 sm:py-32 px-6">
        <Section>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight mb-4">Why AI Nova Club?</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">Everything you need to turn your page into a business.</p>
        </Section>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { title: "Brand Deals Access", desc: "Get connected with brands looking for creators in your niche. We bring the deals to you." },
            { title: "Monetization Opportunities", desc: "Multiple revenue streams — from sponsored posts to affiliate partnerships." },
            { title: "Private Network", desc: "Join a curated community of top-performing creators who share strategies and insights." },
            { title: "Growth Systems", desc: "Proven frameworks to scale your reach, engagement, and follower count consistently." },
          ].map((c) => (
            <Section key={c.title}>
              <div className="group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 px-6">
        <Section>
          <h2 className="text-center text-3xl sm:text-5xl font-bold tracking-tight mb-16">How It Works</h2>
        </Section>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-12 sm:gap-8">
          {[
            { step: "01", title: "Apply", desc: "Fill out a quick application to tell us about your page." },
            { step: "02", title: "Get Approved", desc: "Our team reviews your profile and welcomes qualified creators." },
            { step: "03", title: "Start Earning", desc: "Access brand deals, grow your page, and monetize your content." },
          ].map((s) => (
            <Section key={s.step}>
              <div className="text-center">
                <div className="text-5xl font-bold text-muted-foreground/20 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* Exclusivity */}
      <section className="py-24 sm:py-32 px-6">
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Not everyone gets in.</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              We maintain a high standard. Every member is vetted to ensure quality, commitment, and mutual growth.
            </p>
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <section className="py-32 sm:py-44 px-6">
        <Section>
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">Ready to Join?</h2>
            <a
              href={JOTFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground font-medium rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Apply Now
            </a>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground tracking-tight">AI Nova Club</span>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
