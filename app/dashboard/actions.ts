"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function createProject() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const generatedSlug = Math.random().toString(36).substring(2, 9)
  
  // Create an initial empty block state
  const initialContent = {
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        props: {
          headline: "Welcome to my new site",
          subheadline: "This site was generated with SiteForge AI.",
          buttonText: "Get Started"
        }
      }
    ]
  }

  const { data, error } = await supabase.from('projects').insert({
    user_id: user.id,
    name: 'Untitled Project',
    slug: generatedSlug,
    content: initialContent,
    is_published: false
  }).select('id').single()

  if (error || !data) {
    console.error("Error creating project:", error)
    throw new Error('Could not create project')
  }

  redirect(`/builder/${data.id}`)
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
