"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Save, LayoutTemplate, Type, Grid, FilePlus, ChevronLeft, Send, Loader2 } from 'lucide-react'
import Link from 'next/link'
import styles from './builder.module.css'
import { saveProject } from './actions'

type BlockType = 'hero' | 'features' | 'cta' | 'text'

export interface Block {
  id: string
  type: BlockType
  props: Record<string, string>
}

interface Project {
  id: string
  name: string
  slug: string
  is_published: boolean
  content: {
    blocks: Block[]
  }
}

export default function BuilderClient({ project }: { project: Project }) {
  const [blocks, setBlocks] = useState<Block[]>(project.content?.blocks || [])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)

  const handleSave = async (publish = false) => {
    setIsSaving(true)
    try {
      await saveProject(project.id, { blocks }, publish)
      // Show some toast here in production
      alert(`Project ${publish ? 'published' : 'saved'} successfully!`)
    } catch {
      alert("Failed to save.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(7),
      type,
      props: getDefaultProps(type)
    }
    setBlocks([...blocks, newBlock])
    setSelectedBlockId(newBlock.id)
  }

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  const updateSelectedBlockProp = (key: string, value: string) => {
    if (!selectedBlockId) return
    setBlocks(blocks.map(b => {
      if (b.id === selectedBlockId) {
        return { ...b, props: { ...b.props, [key]: value } }
      }
      return b
    }))
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    
    try {
      // Stub for Phase 4 AI Route
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      })
      
      if (!res.ok) throw new Error("Generation failed")
      
      const generatedBlocks = await res.json()
      setBlocks(generatedBlocks.blocks)
      setAiPrompt('')
    } catch (err) {
      console.error(err)
      alert("AI Generation is not connected yet! Look into Phase 4.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={styles.layout}>
      {/* Left Sidebar */}
      <aside className={styles.leftSidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/dashboard" style={{ color: '#a3a3a3' }}>
            <ChevronLeft size={20} />
          </Link>
          SiteForge Builder
        </div>
        
        <div className={styles.sidebarContent}>
          {/* AI Generation Widget */}
          <div className={styles.aiSection}>
            <div className={styles.aiLabel}>
              <Sparkles size={14} /> AI Generator
            </div>
            <textarea
              className={styles.aiTextarea}
              placeholder="e.g. 'A dark-themed portfolio for a creative agency...'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '0.5rem', fontSize: '0.875rem' }}
              onClick={handleAiGenerate}
              disabled={isGenerating || !aiPrompt.trim()}
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Generate Magic</>}
            </button>
          </div>

          <div className={styles.aiLabel} style={{ marginBottom: '0.75rem' }}>Blocks</div>
          <div className={styles.blocksGrid}>
            <button className={styles.blockBtn} onClick={() => handleAddBlock('hero')}>
              <LayoutTemplate size={24} color="#a78bfa" />
              <span>Hero</span>
            </button>
            <button className={styles.blockBtn} onClick={() => handleAddBlock('features')}>
              <Grid size={24} color="#a78bfa" />
              <span>Features</span>
            </button>
            <button className={styles.blockBtn} onClick={() => handleAddBlock('cta')}>
              <FilePlus size={24} color="#a78bfa" />
              <span>CTA</span>
            </button>
            <button className={styles.blockBtn} onClick={() => handleAddBlock('text')}>
              <Type size={24} color="#a78bfa" />
              <span>Text</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className={styles.mainArea}>
        <header className={styles.topbar}>
          <div style={{ color: '#fff', fontWeight: 600 }}>{project.name} {project.is_published && <span style={{ color: '#ec4899', fontSize: '0.75rem', marginLeft: '0.5rem' }}>LIVE</span>}</div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => handleSave(false)} disabled={isSaving}>
              <Save size={16} /> Save Draft
            </button>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => handleSave(true)} disabled={isSaving}>
              Publish Site
            </button>
          </div>
        </header>

        <div className={styles.canvas}>
          <div className={styles.canvasFrame}>
            {blocks.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>Empty Canvas</h2>
                <p>Drag a block from the left or ask AI to generate something.</p>
              </div>
            ) : (
              blocks.map(block => (
                <div 
                  key={block.id} 
                  className={`${styles.canvasBlock} ${selectedBlockId === block.id ? styles.canvasBlockSelected : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedBlockId(block.id)
                  }}
                >
                  {/* Invisible overlay captures clicks to select without interfering too much if we want inline edit later */}
                  <div className={styles.blockOverlay} />
                  
                  {/* Block Render Logic */}
                  <BlockRenderer block={block} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar (Properties) */}
      <aside className={styles.rightSidebar}>
        <div className={styles.sidebarHeader}>
          Properties
        </div>
        <div className={styles.propertiesPanel}>
          {!selectedBlock ? (
            <div className={styles.emptyState} style={{ fontSize: '0.875rem' }}>
              Select a block on the canvas to edit its properties.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span className={styles.aiLabel} style={{ margin: 0 }}>{selectedBlock.type} BLOCK</span>
                <button onClick={() => handleDeleteBlock(selectedBlock.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>DELETE</button>
              </div>
              
              {Object.keys(selectedBlock.props).map(key => (
                <div key={key} className={styles.propertyGroup}>
                  <label className={styles.propertyLabel}>{key}</label>
                  {key.includes('content') || key.includes('line') ? (
                    <textarea 
                      className={styles.propertyInput} 
                      value={selectedBlock.props[key]} 
                      onChange={(e) => updateSelectedBlockProp(key, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <input 
                      type="text" 
                      className={styles.propertyInput} 
                      value={selectedBlock.props[key]} 
                      onChange={(e) => updateSelectedBlockProp(key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

function getDefaultProps(type: BlockType): Record<string, string> {
  switch (type) {
    case 'hero': return { headline: 'Breathtaking Landing Page', subheadline: 'Create professional web experiences directly from your browser. AI powered and meticulously crafted.', buttonText: 'Start Building' }
    case 'features': return { feature1Title: 'Lightning Fast', feature1Desc: 'Optimized Next.js apps instantly.', feature2Title: 'Fully Reactive', feature2Desc: 'State of the art technology.' }
    case 'cta': return { headline: 'Ready to dive in?', buttonText: 'Get Started Today' }
    case 'text': return { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.' }
    default: return {}
  }
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero':
      return (
        <div className={styles.heroBlock}>
          <h1 className={styles.heroHeadline} style={{ color: '#fff' }}>{block.props.headline}</h1>
          <p className={styles.heroSub}>{block.props.subheadline}</p>
          <button className="btn-primary">{block.props.buttonText}</button>
        </div>
      )
    case 'features':
      return (
        <div className={styles.featuresBlock}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureHeadline} style={{ color: '#fff' }}>{block.props.feature1Title}</h3>
            <p className={styles.featureDesc}>{block.props.feature1Desc}</p>
          </div>
          <div className={styles.featureItem}>
            <h3 className={styles.featureHeadline} style={{ color: '#fff' }}>{block.props.feature2Title}</h3>
            <p className={styles.featureDesc}>{block.props.feature2Desc}</p>
          </div>
        </div>
      )
    case 'cta':
      return (
        <div className={styles.heroBlock} style={{ padding: '4rem 2rem', background: 'rgba(139, 92, 246, 0.05)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>{block.props.headline}</h2>
          <button className="btn-primary">{block.props.buttonText}</button>
        </div>
      )
    case 'text':
      return (
        <div style={{ padding: '2rem', color: '#a3a3a3', maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.6 }}>
          {block.props.content}
        </div>
      )
    default:
      return <div>Unknown block</div>
  }
}
