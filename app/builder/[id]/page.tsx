import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import BuilderClient from "@/app/builder/[id]/BuilderClient";

export const dynamic = "force-dynamic";

export default async function BuilderPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  // Guest Mode: No auth check
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) {
    notFound();
  }

  return <BuilderClient project={project} />;
}
