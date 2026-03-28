import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from './page.module.css'
import { createProject, signOut } from './actions'
import { Plus, Settings, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>SiteForge Dashboard</div>
        <div className={styles.userInfo}>
          {user.email}
          <form action={signOut}>
            <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Sites</h1>
        </div>

        <div className={styles.grid}>
          {/* Create New Project Card */}
          <form action={createProject}>
            <button type="submit" className={`${styles.card} ${styles.cardNew}`}>
              <Plus size={32} />
              <span style={{ fontWeight: 500 }}>Create New Site</span>
            </button>
          </form>

          {/* Render existing projects */}
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className={`${styles.card} glass`}>
                <div>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                  <div className={styles.cardSubtitle}>
                    {project.is_published ? 'Published' : 'Draft'} • {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <Link href={`/${project.slug}`} target="_blank" className={styles.iconBtn} title="View Live Site">
                    <ExternalLink size={18} />
                  </Link>
                  <Link href={`/builder/${project.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
                    Open Builder
                  </Link>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </main>
    </div>
  )
}
