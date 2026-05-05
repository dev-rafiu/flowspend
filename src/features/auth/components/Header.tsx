import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import HeaderThemeToggle from "@/components/HeaderThemeToggle";
import SidebarToggle from "@/features/navigation/components/SidebarToggle";

const Header = () => {
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
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
