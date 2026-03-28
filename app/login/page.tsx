import { login, signup } from "./actions";
import { ArrowLeft, LayoutTemplate, Github, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans font-medium">
      {/* Background Hero Image with Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none grayscale translate-x-12 translate-y-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full" />
      </div>

      <div className="w-full max-w-[440px] relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 group mx-auto">
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center p-2 shadow-xl shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform">
              <LayoutTemplate className="text-white w-full h-full" />
            </div>
            <span className="text-2xl font-black font-space tracking-tight italic">SiteForge AI</span>
          </Link>
          <h1 className="text-3xl font-bold font-space tracking-tight text-white">The Celestial Architect</h1>
          <p className="text-neutral-400 text-sm italic">Enter the workspace and forge your vision.</p>
        </div>

        <div className="glass p-8 rounded-[2rem] shadow-2xl space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            {searchParams?.message && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-destructive animate-pulse" />
                {searchParams.message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button formAction={login} className="btn-primary !py-3 font-bold text-sm">
                Sign In
              </button>
              <button formAction={signup} className="btn-secondary !py-3 font-bold text-sm">
                Create Account
              </button>
            </div>
          </form>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Secure Access</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <p className="text-[11px] text-center text-neutral-500 max-w-[280px] mx-auto leading-relaxed">
            By accessing the forge, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <div className="text-center">
           <Link href="/" className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
