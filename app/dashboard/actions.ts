"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const name = "Untitled Vision";
  const slug = `vision-${Math.random().toString(36).substring(7)}`;

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: user.id,
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

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
