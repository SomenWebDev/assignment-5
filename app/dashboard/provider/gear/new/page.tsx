import AddGearForm from "@/components/dashboard/provider/AddGearForm";
import { getCategories } from "@/lib/api/category";

export default async function AddGearPage() {
  const categories = await getCategories();

  return <AddGearForm categories={categories} />;
}
