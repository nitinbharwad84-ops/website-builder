import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import BuilderClient from './BuilderClient'

export const dynamic = 'force-dynamic'

export default async function BuilderPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) {
    return <div>Project not found</div>
  }

  // Check ownership
  if (project.user_id !== user.id) {
    return <div>Access denied</div>
  }

  return <BuilderClient project={project} />
}
