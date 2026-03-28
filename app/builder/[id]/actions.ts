"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveProject(projectId: string, content: any, isPublished = false) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { error } = await supabase
    .from("projects")
    .update({ 
      content, 
      is_published: isPublished,
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Save error:", error)
    throw new Error("Failed to save project")
  }

  revalidatePath(`/builder/${projectId}`)
  revalidatePath("/dashboard")
}
