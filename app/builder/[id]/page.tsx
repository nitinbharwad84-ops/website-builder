import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import BuilderClient from "@/app/builder/[id]/BuilderClient";

export const dynamic = "force-dynamic";

export default async function BuilderPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) {
    notFound();
  }

  if (project.user_id !== user.id) {
    redirect("/dashboard");
  }

  return <BuilderClient project={project} />;
}
