import { createClient } from "@/lib/supabase/server";
import Header from "./Header";
import LandingHeader from "@/features/landing/components/LandingHeader";

const ConditionalHeader = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <LandingHeader />;
  return <Header />;
};

export default ConditionalHeader;
