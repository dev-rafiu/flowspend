import getUserBalance from "../actions/getUserBalance";
import { formatCurrency } from "@/lib/utils";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div className="space-y-2">
      <p className="text-base font-medium text-slate-600">Total Balance:</p>
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
        ${formatCurrency(balance ?? 0)}
      </h1>
    </div>
  );
};

export default Balance;
