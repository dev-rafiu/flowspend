import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getCategories from "../actions/getCategories";
import AddCategoryForm from "./AddCategoryForm";
import CategoryRow from "./CategoryRow";

export default async function CategoriesCard() {
  const { categories } = await getCategories();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Custom categories</CardTitle>
        <CardDescription>
          Add your own categories alongside the built-in ones.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddCategoryForm />

        {categories.length > 0 ? (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {categories.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No custom categories yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
