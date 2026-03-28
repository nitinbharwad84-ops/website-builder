"use server"

import { createClient } from "@/utils/supabase/server"

export async function saveProject(projectId: string, content: Record<string, unknown>, isPublished: boolean = false) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('projects')
    .update({ 
      content, 
      is_published: isPublished,
      updated_at: new Date().toISOString()
    })
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    console.error("Save error:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
