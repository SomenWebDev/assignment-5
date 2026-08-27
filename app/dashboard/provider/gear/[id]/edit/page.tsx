import { notFound } from "next/navigation";

import EditGearForm from "@/components/dashboard/provider/EditGearForm";

import { getCategories } from "@/lib/api/category";
import { getGearById } from "@/lib/api/gear";

interface EditGearPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGearPage({ params }: EditGearPageProps) {
  const { id } = await params;

  let gear;
  let categories;

  try {
    [gear, categories] = await Promise.all([getGearById(id), getCategories()]);
  } catch {
    notFound();
  }

  return <EditGearForm gear={gear} categories={categories} />;
}
