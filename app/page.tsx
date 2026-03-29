import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wand2, Layout, Zap, Search, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Background Hero Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Futuristic Background"
          fill
          className="object-cover opacity-60 brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      </div>

      {/* Global Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center p-1.5 shadow-lg purple-glow rotate-12 group-hover:rotate-0 transition-transform">
            <Layout className="text-white w-full h-full" />
          </div>
          <span className="text-xl font-bold font-space tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            SiteForge AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
          <Link href="#features" className="hover:text-white transition-colors">AI Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div>
          <Link href="/dashboard" className="btn-secondary !py-2 !px-5 text-sm uppercase tracking-widest font-black">
            Enter Workspace
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-32 lg:pt-48 flex flex-col items-center px-4 overflow-hidden">
        {/* Hero Section */}
        <section className="text-center max-w-5xl mx-auto space-y-8 mb-24 lg:mb-40 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest animate-pulse">
            <SparkleIcon className="w-3 h-3" />
            The Future of Web Design is Here
          </div>
          <h1 className="text-6xl lg:text-8xl font-black font-space leading-[0.9] tracking-tighter max-w-4xl mx-auto">
            Forge Your <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-purple-400 bg-clip-text text-transparent italic">
              Vision with AI
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            The ethereal workspace where creativity meets artificial intelligence. Build professional, high-converting websites in seconds, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg shadow-2xl purple-glow">
              Start Building <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="#templates" className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg">
              Explore Templates
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 lg:mb-40">
          <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Wand2 className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-space">AI Magic Generation</h3>
            <p className="text-neutral-400 leading-relaxed">
              Describe your business and watch as SiteForge generates a complete, responsive site structure with copy and images in under 60 seconds.
            </p>
          </div>
          
          <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Layout className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-space">Intuitive Forge</h3>
            <p className="text-neutral-400 leading-relaxed">
              A purely visual canvas. Drag, drop, and refine without ever touching a line of code. It&apos;s web building, reimagined.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Zap className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-space">SEO Intelligence</h3>
            <p className="text-neutral-400 leading-relaxed">
              Real-time optimization tips and automated metadata generation to ensure your vision reaches the world.
            </p>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="w-full max-w-7xl mx-auto space-y-12 mb-24 lg:mb-40">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold font-space capitalize tracking-tight">Celestial Blueprints</h2>
            <p className="text-neutral-400">Start with a foundation built by master architects. Optimized for performance and high-end conversion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden group">
              <Image 
                src="/images/template-folio.png"
                alt="Ethereal Folio"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-2xl font-bold font-space">Ethereal Folio</h4>
                <p className="text-neutral-300">Best for Creatives & Designers</p>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden group">
              <Image 
                src="/images/template-shop.png"
                alt="Nova Shop"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-2xl font-bold font-space">Nova Shop</h4>
                <p className="text-neutral-300">Best for Premium Brands</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-7xl mx-auto glass rounded-3xl p-12 lg:p-24 text-center space-y-8 mb-24 relative overflow-hidden group">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-black to-black opacity-50 transition-opacity" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-7xl font-bold font-space max-w-3xl mx-auto leading-tight">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto italic font-medium">
              Join 10,000+ creators building the next generation of the web with SiteForge AI. No credit card required.
            </p>
            <Link href="/dashboard" className="btn-primary px-12 py-5 text-xl font-black">
              Start Building Now
            </Link>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 lg:py-24 bg-black/80 backdrop-blur-3xl px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-neutral-400">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center p-1 shadow shadow-primary">
                <Layout className="text-white w-full h-full" />
              </div>
              <span className="text-lg font-bold font-space tracking-tight text-white italic">
                SiteForge AI
              </span>
            </div>
            <p className="max-w-xs leading-relaxed">
              Empowering architects of the digital age with celestial intelligence. Build beyond the limit.
            </p>
            <p className="font-medium text-white/50">© 2024 SiteForge AI. Built for the Celestial Architect.</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs">Resources</h5>
            <div className="flex flex-col gap-3">
              <Link href="#" className="hover:text-primary transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-primary transition-colors">Templates</Link>
              <Link href="#" className="hover:text-primary transition-colors">AI Guide</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs">Legal</h5>
            <div className="flex flex-col gap-3">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Licensing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
