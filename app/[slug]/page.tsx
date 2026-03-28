import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import styles from './published.module.css'
import Link from 'next/link'

export const dynamic = 'force-dynamic' // Ensure it's not statically cached immediately if they publish

export default async function PublishedSite({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!project) {
    notFound()
  }

  if (!project.is_published) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1>Under Construction</h1>
        <p style={{ color: '#888' }}>This site has not been published yet.</p>
        <Link href="/" className="btn-secondary" style={{ marginTop: '1rem' }}>Return Home</Link>
      </div>
    )
  }

  const blocks = Array.isArray(project.content?.blocks) ? project.content.blocks : []

  return (
    <main className={styles.main}>
      {blocks.map((block: { id: string; type: string; props: Record<string, string> }) => (
        <PublishedBlockRenderer key={block.id} block={block} />
      ))}
      <footer className={styles.footer}>
        Powered by <strong>SiteForge AI</strong>
      </footer>
    </main>
  )
}

function PublishedBlockRenderer({ block }: { block: { id: string; type: string; props: Record<string, string> } }) {
  switch (block.type) {
    case 'hero':
      return (
        <section className={styles.heroBlock}>
          <h1 className={styles.heroHeadline}>{block.props.headline}</h1>
          <p className={styles.heroSub}>{block.props.subheadline}</p>
          {block.props.buttonText && <button className="btn-primary">{block.props.buttonText}</button>}
        </section>
      )
    case 'features':
      return (
        <section className={styles.featuresBlock}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureHeadline}>{block.props.feature1Title}</h3>
            <p className={styles.featureDesc}>{block.props.feature1Desc}</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureHeadline}>{block.props.feature2Title}</h3>
            <p className={styles.featureDesc}>{block.props.feature2Desc}</p>
          </div>
        </section>
      )
    case 'cta':
      return (
        <section className={styles.ctaBlock}>
          <h2 className={styles.ctaHeadline} style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 800 }}>{block.props.headline}</h2>
          {block.props.buttonText && <button className="btn-primary">{block.props.buttonText}</button>}
        </section>
      )
    case 'text':
      return (
        <section className={styles.textBlock}>
          {block.props.content}
        </section>
      )
    default:
      return null
  }
}
