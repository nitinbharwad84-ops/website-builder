import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { LayoutTemplate } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PublishedPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single();

  if (!project) {
    notFound();
  }

  const blocks = Array.isArray(project.content?.blocks) ? project.content.blocks : [];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30">
      <main>
        {blocks.map((block: any) => (
          <PublishedBlockRenderer key={block.id} block={block} />
        ))}
      </main>
      
      <footer className="py-12 px-6 border-t border-white/5 bg-[#020617] text-center space-y-4">
        <div className="flex items-center justify-center gap-2 grayscale brightness-200">
           <div className="w-6 h-6 rounded bg-primary flex items-center justify-center p-1 shadow shadow-primary">
            <LayoutTemplate className="text-white w-full h-full" />
          </div>
          <span className="text-sm font-bold font-space tracking-tight text-white italic">
            SiteForge AI
          </span>
        </div>
        <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
          Created with Celestial Intelligence.
        </p>
      </footer>
    </div>
  );
}

function PublishedBlockRenderer({ block }: { block: any }) {
  switch (block.type) {
    case "hero":
      return (
        <section className="py-32 lg:py-48 px-8 text-center space-y-10 relative overflow-hidden bg-gradient-to-br from-primary/10 via-black to-black border-b border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-30" />
          <h1 className="text-6xl lg:text-9xl font-black font-space tracking-tighter italic animate-in fade-in slide-in-from-bottom-6 duration-700">{block.props.headline}</h1>
          <p className="text-xl lg:text-3xl text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed italic animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">{block.props.subheadline}</p>
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              <button className="btn-primary px-12 py-5 text-xl font-black shadow-2xl purple-glow">{block.props.buttonText}</button>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="py-24 lg:py-40 px-8 bg-[#020617] border-b border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="glass p-12 lg:p-16 rounded-[3rem] space-y-6 hover:border-primary/30 transition-all group">
              <h3 className="text-3xl font-bold font-space text-primary group-hover:scale-110 transition-transform origin-left">{block.props.feature1Title}</h3>
              <p className="text-xl text-neutral-400 font-medium leading-relaxed italic">{block.props.feature1Desc}</p>
            </div>
            <div className="glass p-12 lg:p-16 rounded-[3rem] space-y-6 hover:border-primary/30 transition-all group">
              <h3 className="text-3xl font-bold font-space text-primary group-hover:scale-110 transition-transform origin-left">{block.props.feature2Title}</h3>
              <p className="text-xl text-neutral-400 font-medium leading-relaxed italic">{block.props.feature2Desc}</p>
            </div>
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="py-24 lg:py-40 px-8 text-center space-y-12 bg-primary relative overflow-hidden group">
           <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          <h2 className="text-5xl lg:text-8xl font-black font-space tracking-tight text-white leading-[0.9] max-w-4xl mx-auto">{block.props.headline}</h2>
          <button className="bg-white text-primary font-black px-12 py-6 rounded-3xl shadow-2xl hover:scale-110 transition-transform uppercase tracking-widest text-lg">
            {block.props.buttonText}
          </button>
        </section>
      );
    case "text":
      return (
        <section className="py-24 lg:py-40 px-8 bg-black border-b border-white/5">
          <div className="max-w-4xl mx-auto">
             <p className="text-2xl lg:text-4xl text-neutral-400 font-medium leading-relaxed whitespace-pre-wrap italic">
                {block.props.content}
              </p>
          </div>
        </section>
      );
    default:
      return null;
  }
}
