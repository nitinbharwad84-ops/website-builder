"use client";

import { useState, useTransition } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Globe, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Wand2, 
  Layers, 
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  Settings2,
  Trash2,
  CheckCircle2,
  ChevronDown,
  LayoutTemplate
} from "lucide-react";
import Link from "next/link";
import { saveProject } from "./actions";

export type BlockType = "hero" | "features" | "cta" | "text";

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, string>;
}

interface Project {
  id: string;
  name: string;
  content: { blocks: Block[] } | null;
  is_published: boolean;
  slug: string;
}

export default function BuilderClient({ project }: { project: Project }) {
  const [blocks, setBlocks] = useState<Block[]>(project.content?.blocks || []);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab ] = useState<"add" | "layers">("add");

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  async function handleSave(publish = false) {
    setIsSaving(true);
    try {
      await saveProject(project.id, { blocks }, publish);
      // In a real app, use a toast notification
      alert(`Project ${publish ? "published" : "saved"} successfully!`);
    } catch {
      alert("Failed to save.");
    } finally {
      setIsSaving(false);
    }
  }

  async function generateWithAI() {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.blocks) {
        setBlocks(data.blocks);
        setPrompt("");
        alert("AI Generation Complete!");
      }
    } catch {
      alert("AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  function updateBlockProps(id: string, newProps: Record<string, string>) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b))
    );
  }

  function addBlock(type: BlockType) {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(7),
      type,
      props: getDefaultProps(type),
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  }

  function deleteBlock(id: string) {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  }

  return (
    <div className="h-screen bg-[#020617] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Bar Navigation */}
      <header className="h-16 glass border-b border-white/5 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-neutral-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1.5 shadow-lg shadow-primary/20 rotate-12">
              <LayoutTemplate className="text-white w-full h-full" />
            </div>
            <div>
               <h1 className="text-sm font-bold font-space tracking-tight leading-none italic">{project.name}</h1>
               <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{project.is_published ? "Live" : "Draft"}</span>
            </div>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="hidden md:flex items-center glass px-1 py-1 rounded-2xl border-white/10">
          <button onClick={() => setDevice("desktop")} className={`p-2 rounded-xl transition-all ${device === "desktop" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white"}`}>
            <Monitor className="w-4 h-4" />
          </button>
          <button onClick={() => setDevice("tablet")} className={`p-2 rounded-xl transition-all ${device === "tablet" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white"}`}>
            <Tablet className="w-4 h-4" />
          </button>
          <button onClick={() => setDevice("mobile")} className={`p-2 rounded-xl transition-all ${device === "mobile" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white"}`}>
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => handleSave(false)} disabled={isSaving} className="btn-secondary !py-2 !px-4 text-xs font-bold flex items-center gap-2">
            <Save className="w-3.5 h-3.5" /> {isSaving ? "Saving..." : "Save Draft"}
          </button>
          <button onClick={() => handleSave(true)} disabled={isSaving} className="btn-primary !py-2 !px-5 text-xs font-black flex items-center gap-2 purple-glow">
            <Globe className="w-3.5 h-3.5" /> Publish Site
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library & AI */}
        <aside className="w-72 border-r border-white/5 bg-black/20 backdrop-blur-3xl flex flex-col">
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => setActiveTab("add")}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === "add" ? "border-primary text-primary bg-primary/5" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Add Components
            </button>
            <button 
              onClick={() => setActiveTab("layers")}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === "layers" ? "border-primary text-primary bg-primary/5" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Layers
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeTab === "add" ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Wand2 className="w-3 h-3" /> Magical Generation
                  </h3>
                  <div className="glass p-4 rounded-3xl space-y-3 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                     <textarea
                      placeholder="Describe the website you want to build..."
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-3 text-xs focus:outline-none focus:border-primary/50 min-h-[100px] resize-none relative z-10 placeholder:text-neutral-600 font-medium"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button 
                      onClick={generateWithAI}
                      disabled={isGenerating || !prompt}
                      className="w-full btn-primary !py-2.5 text-xs font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale relative z-10"
                    >
                      {isGenerating ? (
                        <>Building magic...</>
                      ) : (
                        <><Wand2 className="w-3.5 h-3.5" /> Forge with AI</>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Plus className="w-3 h-3" /> Component Library
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ComponentCard icon={<Wand2 />} title="Hero" onClick={() => addBlock("hero")} />
                    <ComponentCard icon={<Layers />} title="Features" onClick={() => addBlock("features")} />
                    <ComponentCard icon={<Type />} title="Text" onClick={() => addBlock("text")} />
                    <ComponentCard icon={<CheckCircle2 />} title="CTA" onClick={() => addBlock("cta")} />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                {blocks.length === 0 ? (
                  <div className="text-center py-12 opacity-30 text-xs font-bold leading-relaxed">
                    The forge is empty. <br /> Add a component to begin.
                  </div>
                ) : (
                  blocks.map((block, idx) => (
                    <div 
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${selectedBlockId === block.id ? "bg-primary/10 border-primary/30 text-primary" : "hover:bg-white/5 border-transparent text-neutral-400 hover:text-white"}`}
                    >
                      <span className="text-[10px] font-black opacity-30">0{idx + 1}</span>
                      <LayoutTemplate className="w-4 h-4" />
                      <span className="text-xs font-bold capitalize tracking-tight">{block.type}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-black/40 overflow-hidden relative flex items-start justify-center p-8 overflow-y-auto">
          {/* Canvas Decoration */}
          <div className="fixed inset-0 pointer-events-none grayscale opacity-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full" />
          </div>

          <div 
            className={`transition-all duration-500 bg-black border border-white/5 shadow-[0_0_100px_-20px_rgba(124,58,237,0.1)] rounded-3xl overflow-hidden min-h-[80vh] flex flex-col ${
              device === "desktop" ? "w-full max-w-5xl" :
              device === "tablet" ? "w-[768px]" : "w-[375px]"
            }`}
          >
            {blocks.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 p-12 text-center opacity-40">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 animate-pulse">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-space">The Obsidian Canvas</h2>
                  <p className="max-w-xs mx-auto text-sm italic font-medium leading-relaxed">Describe your vision or drag components here to begin the architectural process.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                {blocks.map((block) => (
                  <div 
                    key={block.id} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlockId(block.id);
                    }}
                    className={`relative group cursor-pointer border-2 transition-all ${
                      selectedBlockId === block.id ? "border-primary ring-4 ring-primary/5" : "border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="pointer-events-none select-none">
                      <CanvasBlockRenderer block={block} />
                    </div>
                    
                    {/* Block Toolbar */}
                    <div className={`absolute top-0 right-0 p-2 flex gap-1 z-30 transition-opacity ${selectedBlockId === block.id ? "opacity-100" : "opacity-0"}`}>
                      <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="w-8 h-8 rounded-lg bg-destructive text-white flex items-center justify-center shadow-lg hover:bg-destructive/80 active:scale-95 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Properties Panel */}
        <aside className="w-80 border-l border-white/5 bg-black/20 backdrop-blur-3xl flex flex-col">
          <div className="p-6 border-b border-white/5">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
               <Settings2 className="w-3.5 h-3.5" /> Properties Panel
             </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {selectedBlock ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                   {selectedBlock.type} component
                </div>

                <div className="space-y-6">
                  {Object.entries(selectedBlock.props).map(([key, value]) => (
                    <div key={key} className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1 group-focus-within:text-primary transition-colors">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => updateBlockProps(selectedBlock.id, { [key]: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs focus:outline-none focus:border-primary/50 min-h-[80px] font-medium leading-relaxed resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20 p-8 space-y-4 grayscale">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                  <PointerIcon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold leading-relaxed">Select a component on the <br /> canvas to edit its essence.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ComponentCard({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="glass p-4 rounded-3xl flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95 group"
    >
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">{title}</span>
    </button>
  );
}

function PointerIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 14a8 8 0 0 1-8 8" />
      <path d="M18 11c.966 0 1.75.784 1.75 1.75 0 .422-.15.81-.4 1.112" />
      <path d="M14 10.5a2.5 2.5 0 0 1 2.5 2.5c0 .422-.15.81-.4 1.112" />
      <path d="M10 10.5a2.5 2.5 0 0 1 2.5 2.5c0 .422-.15.81-.4 1.112" />
      <path d="M7 13.5c-.966 0-1.75-.784-1.75-1.75 0-.422.15-.81.4-1.112" />
      <path d="M2 13.5a1 1 0 0 1 1-1" />
      <path d="M20 13.5a1 1 0 0 1 1 1" />
      <path d="M12 2v2" />
      <path d="M12 8v2" />
      <path d="M7 4a7.5 7.5 0 0 1 10 0" />
    </svg>
  );
}

function CanvasBlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return (
        <div className="py-24 px-12 text-center space-y-6 relative overflow-hidden bg-gradient-to-br from-primary/10 via-black to-black">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          <h2 className="text-5xl font-black font-space tracking-tighter italic">{block.props.headline}</h2>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto font-medium leading-relaxed italic">{block.props.subheadline}</p>
          <button className="btn-primary !px-8">{block.props.buttonText}</button>
        </div>
      );
    case "features":
      return (
        <div className="py-20 px-12 bg-[#020617] grid grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl space-y-4">
            <h4 className="text-xl font-bold font-space text-primary">{block.props.feature1Title}</h4>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed italic">{block.props.feature1Desc}</p>
          </div>
          <div className="glass p-8 rounded-3xl space-y-4">
            <h4 className="text-xl font-bold font-space text-primary">{block.props.feature2Title}</h4>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed italic">{block.props.feature2Desc}</p>
          </div>
        </div>
      );
    case "cta":
      return (
        <div className="py-20 px-12 text-center space-y-8 bg-primary">
          <h3 className="text-4xl font-black font-space tracking-tight text-white">{block.props.headline}</h3>
          <button className="bg-white text-primary font-black px-10 py-4 rounded-2xl shadow-2xl hover:bg-neutral-100 transition-colors uppercase tracking-widest text-sm">
            {block.props.buttonText}
          </button>
        </div>
      );
    case "text":
      return (
        <div className="py-20 px-12 bg-black">
          <p className="text-lg text-neutral-400 max-w-3xl font-medium leading-relaxed whitespace-pre-wrap italic">
            {block.props.content}
          </p>
        </div>
      );
    default:
      return null;
  }
}

function getDefaultProps(type: BlockType): Record<string, string> {
  switch (type) {
    case "hero":
      return {
        headline: "Breathtaking Landing Page",
        subheadline: "Create professional web experiences directly from your browser. AI powered and meticulously crafted.",
        buttonText: "Start Building",
      };
    case "features":
      return {
        feature1Title: "Lightning Fast",
        feature1Desc: "Optimized Next.js apps instantly.",
        feature2Title: "Fully Reactive",
        feature2Desc: "State of the art technology.",
      };
    case "cta":
      return {
        headline: "Ready to dive in?",
        buttonText: "Get Started Today",
      };
    case "text":
      return {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
      };
    default:
      return {};
  }
}
