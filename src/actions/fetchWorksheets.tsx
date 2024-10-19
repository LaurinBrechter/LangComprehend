"use server";

import { redirect } from "next/navigation";

export const fetchWorksheets = async (formData: FormData) => {
  "use server"

  const search = formData.get("search")
  const language = formData.get("language")

  redirect(`/library?language=${language}`)
}