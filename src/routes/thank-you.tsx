import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYou,
  head: () => ({
    meta: [
      { title: "Thank You — AI Nova Club" },
      { name: "description", content: "Thank you for applying to AI Nova Club. Follow us on Instagram and DM 'Applied' to get started." },
    ],
  }),
});

const INSTAGRAM_URL = "https://www.instagram.com/ainovaclub.network/";

function ThankYou() {
  return (
    <div className="min-h-screen bg-[#030305] text-white flex items-center justify-center px-6">
      {/* Animated Background - Same as main page */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.06] blur-[150px] animate-float-slow" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[50%] h-[50%] rounded-full bg-white/[0.05] blur-[120px] animate-float-slow-reverse" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-white/[0.04] blur-[100px] animate-float-medium" />
        <div className="absolute top-[60%] right-[20%] w-[25%] h-[25%] rounded-full bg-white/[0.03] blur-[80px] animate-float-fast" />
        <div className="absolute bottom-[20%] left-[30%] w-[20%] h-[20%] rounded-full bg-white/[0.04] blur-[60px] animate-pulse-slow" />
        {/* Small particles */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-white/30 animate-twinkle" />
        <div className="absolute top-[35%] left-[80%] w-1.5 h-1.5 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[70%] left-[25%] w-1 h-1 rounded-full bg-white/25 animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[45%] left-[45%] w-0.5 h-0.5 rounded-full bg-white/40 animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[15%] left-[60%] w-1 h-1 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[80%] left-[70%] w-1.5 h-1.5 rounded-full bg-white/30 animate-twinkle" style={{ animationDelay: '3s' }} />
        {/* Subtle vertical lines */}
        <div className="absolute left-[20%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-line-drift" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-line-drift" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[80%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-line-drift" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Success Checkmark */}
        <div className="mb-10">
          <div className="w-28 h-28 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
            <svg className="w-14 h-14 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white/60 tracking-wide">Application Submitted</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          You're Almost In!
        </h1>

        {/* Instructions */}
        <p className="text-white/50 text-lg leading-relaxed mb-8">
          You've applied for <span className="text-white font-medium">AI Nova Club</span>. 
          To complete your application:
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-10 text-left">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 text-sm font-medium">
              1
            </div>
            <div>
              <p className="text-white font-medium mb-1">Follow our Instagram</p>
              <p className="text-white/40 text-sm">@ainovaclub.network</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 text-sm font-medium">
              2
            </div>
            <div>
              <p className="text-white font-medium mb-1">DM us "Applied"</p>
              <p className="text-white/40 text-sm">So we can prioritize your application</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 mb-8">
          <p className="text-amber-200/80 text-sm">
            <span className="font-medium">Important:</span> You must follow us first to be able to send a DM. 
            Applications without a follow cannot be processed.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold rounded-full text-base tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          <Instagram className="w-5 h-5" />
          <span>DM "Applied" Now</span>
        </a>

        {/* Alternative Link */}
        <p className="mt-6 text-white/30 text-sm">
          Or visit{" "}
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white underline underline-offset-4 transition-colors"
          >
            instagram.com/ainovaclub.network
          </a>
        </p>
      </div>
    </div>
  );
}
