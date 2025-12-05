import { currentUser } from "@clerk/nextjs/server";
import Header from "./Header";
import LandingHeader from "./LandingHeader";

const ConditionalHeader = async () => {
  const user = await currentUser();

  if (!user) {
    return <LandingHeader />;
  }

  return <Header />;
};

export default ConditionalHeader;
