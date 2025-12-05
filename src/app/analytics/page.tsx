import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Analytics</h2>
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-600">
        <p>Analytics dashboard coming soon...</p>
      </div>
    </div>
  );
}





