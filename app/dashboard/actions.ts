"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const GUEST_ID = "00000000-0000-0000-0000-000000000000";

export async function createProject() {
  const supabase = createClient();
  
  // Guest Mode: Using constant ID instead of auth.getUser()
  const userId = GUEST_ID;

  const name = "Untitled Vision";
  const slug = `vision-${Math.random().toString(36).substring(7)}`;

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: userId,
        name,
        slug,
        content: { blocks: [] },
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Create project error:", error);
    return;
  }

  revalidatePath("/dashboard");
  redirect(`/builder/${data.id}`);
}
