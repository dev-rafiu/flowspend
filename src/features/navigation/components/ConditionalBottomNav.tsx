import { currentUser } from "@clerk/nextjs/server";
import BottomNav from "./BottomNav";

const ConditionalBottomNav = async () => {
  const user = await currentUser();

  // Only show bottom nav for authenticated users
  if (!user) {
    return null;
  }

  return <BottomNav />;
};

export default ConditionalBottomNav;





