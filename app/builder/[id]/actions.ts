"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const GUEST_ID = "00000000-0000-0000-0000-000000000000";

export async function saveProject(projectId: string, content: any, isPublished = false) {
  const supabase = createClient()
  
  // Guest Mode: No auth check
  const userId = GUEST_ID;

  const { error } = await supabase
    .from("projects")
    .update({ 
      content, 
      is_published: isPublished,
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId)
    .eq("user_id", userId)

  if (error) {
    console.error("Save error:", error)
    throw new Error("Failed to save project")
  }

  revalidatePath(`/builder/${projectId}`)
  revalidatePath("/dashboard")
}
