import Guest from "@/app/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransactions from "@/app/components/AddTransactions";

export default async function Home() {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <main>
      <h1>Welcome {user.firstName}</h1>

      <AddTransactions />
    </main>
  );
}
