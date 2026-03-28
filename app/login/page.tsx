import { login, signup } from './actions'
import styles from './page.module.css'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      
      <div className={`${styles.card} glass`}>
        <Link href="/" style={{ color: '#a3a3a3', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', width: 'fit-content' }}>
          <ArrowLeft size={16} /> Back
        </Link>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to access your projects.</p>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              className={styles.input}
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button formAction={login} className={`btn-primary ${styles.btnSubmit}`}>
              Log In
            </button>
            <button formAction={signup} className={`btn-secondary ${styles.btnSubmit}`}>
              Sign Up
            </button>
          </div>
          
          {searchParams?.message && (
            <div className={styles.error}>
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
