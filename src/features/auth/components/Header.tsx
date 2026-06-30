import Logo from "@/components/layout/Logo";
import HeaderThemeToggle from "@/components/layout/HeaderThemeToggle";
import SidebarToggle from "@/features/navigation/components/SidebarToggle";
import UserMenu from "./UserMenu";
import { createClient } from "@/lib/supabase/server";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { name: string | null; image_url: string | null; email: string } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("name, image_url, email")
      .eq("id", user.id)
      .single();
    profile = data ?? { name: null, image_url: null, email: user.email ?? "" };
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-8 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-3">
        <SidebarToggle />
        <div className="lg:hidden">
          <Logo href="/dashboard" />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <HeaderThemeToggle />
        {profile && <UserMenu profile={profile} />}
      </div>
    </header>
  );
};

export default Header;
