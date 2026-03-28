import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plus, FolderOpen, LayoutTemplate, Settings, ExternalLink, MoreVertical, LogOut, User } from "lucide-react";
import Link from "next/link";
import { createProject, signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activeCount = projects?.length || 0;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1.5 shadow-lg shadow-primary/20 rotate-12">
            <LayoutTemplate className="text-white w-full h-full" />
          </div>
          <span className="font-space font-bold tracking-tight text-lg italic">SiteForge</span>
        </div>
        
        <nav className="flex-1 p-4 pt-8 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold transition-all">
            <FolderOpen className="w-5 h-5" />
            Projects
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-neutral-400 hover:text-white transition-all">
            <LayoutTemplate className="w-5 h-5" />
            Templates
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-neutral-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate text-neutral-300">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-neutral-400 hover:text-destructive transition-all">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="lg:hidden flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1.5">
              <LayoutTemplate className="text-white w-full h-full" />
            </div>
            <span className="font-space font-bold tracking-tight text-lg italic">SiteForge</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold font-space tracking-tight">My Projects</h1>
          </div>

          <form action={createProject}>
            <button className="btn-primary !py-2 !px-5 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create New Site
            </button>
          </form>
        </header>

        {/* Scrollable Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-neutral-400 font-medium">{activeCount} Active Projects</p>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Sort By: <span className="text-white hover:text-primary cursor-pointer transition-colors">Recent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Create New Project Card */}
              <form action={createProject} className="h-full">
                <button type="submit" className="w-full h-full aspect-[4/3] rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-4 transition-all group overflow-hidden relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-neutral-500 group-hover:text-primary" />
                  </div>
                  <span className="text-neutral-500 group-hover:text-white font-semibold transition-colors">Forge New Project</span>
                </button>
              </form>

              {/* Project Cards */}
              {projects?.map((project) => (
                <div key={project.id} className="group glass rounded-3xl overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[16/10] relative bg-neutral-900 overflow-hidden">
                    {/* Placeholder for project thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LayoutTemplate className="w-12 h-12 text-white/10 group-hover:text-primary/20 transition-colors" />
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.is_published ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/20 backdrop-blur-md">Published</span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/20 backdrop-blur-md">Draft</span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold font-space truncate max-w-[200px]">{project.name}</h4>
                        <p className="text-xs text-neutral-500 mt-1">Last edited {new Date(project.updated_at).toLocaleDateString()}</p>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-500 hover:text-white">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                       <Link href={`/builder/${project.id}`} className="flex-1 btn-primary !py-2 !px-4 text-xs font-bold text-center">
                        Open Builder
                      </Link>
                      <Link href={`/${project.slug}`} target="_blank" className="p-2 glass hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-neutral-400 hover:text-white" title="View Live">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects && projects.length === 0 && (
              <div className="text-center py-24 space-y-6">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto opacity-50">
                  <FolderOpen className="w-10 h-10 text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-space">No projects yet</h3>
                  <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">Your celestial blueprints will appear here once you start forging your visions with AI.</p>
                </div>
                <form action={createProject}>
                    <button className="btn-primary">Create Your First Site</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
