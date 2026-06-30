import { createClient } from "@/lib/supabase/server";
import Sidebar from "./Sidebar";

const ConditionalSidebar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return <Sidebar />;
};

export default ConditionalSidebar;
