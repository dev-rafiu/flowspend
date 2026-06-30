import { createClient } from "@/lib/supabase/server";
import BottomNav from "./BottomNav";

const ConditionalBottomNav = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return <BottomNav />;
};

export default ConditionalBottomNav;
