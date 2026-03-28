import Link from 'next/link';
import { ArrowRight, Wand2, Zap, Layout } from 'lucide-react';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.background} />
      
      <nav className={styles.nav}>
        <div className={styles.logo}>SiteForge AI</div>
        <div>
          <Link href="/dashboard" className="btn-secondary">
            Login
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Build websites at the <br />
          <span className={styles.highlight}>speed of thought.</span>
        </h1>
        <p className={styles.subtitle}>
          The world's first AI-powered structural website builder. 
          Prompt it, drag it, and launch it instantly. Zero cost. Maximum power.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/dashboard" className="btn-primary">
            Start Building Free <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn-secondary">
            See how it works
          </a>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={`${styles.featureCard} glass`}>
          <div className={styles.featureIcon}>
            <Wand2 size={24} />
          </div>
          <h3 className={styles.featureTitle}>AI Generation</h3>
          <p className={styles.featureDesc}>
            Type what you want. Our integrated Llama 3 engine instantly crafts a beautiful, structured layout directly onto your canvas.
          </p>
        </div>

        <div className={`${styles.featureCard} glass`}>
          <div className={styles.featureIcon}>
            <Layout size={24} />
          </div>
          <h3 className={styles.featureTitle}>Block-based Engine</h3>
          <p className={styles.featureDesc}>
            Incredibly robust grid and block system. No more messy absolute positioning. Everything collapses perfectly on mobile devices natively.
          </p>
        </div>

        <div className={`${styles.featureCard} glass`}>
          <div className={styles.featureIcon}>
            <Zap size={24} />
          </div>
          <h3 className={styles.featureTitle}>Next.js Powered</h3>
          <p className={styles.featureDesc}>
            Published websites are served as ultra-fast Next.js React Server Components. Experience maximum SEO performance out of the box.
          </p>
        </div>
      </section>
    </main>
  );
}
