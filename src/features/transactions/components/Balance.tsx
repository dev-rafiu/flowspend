import getUserBalance from "../actions/getUserBalance";
import { formatCurrency } from "@/lib/utils";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div className="">
      <p className="text-base text-slate-500">Total Balance:</p>
      <h1 className="text-xl">${formatCurrency(balance ?? 0)}</h1>
    </div>
  );
};

export default Balance;
