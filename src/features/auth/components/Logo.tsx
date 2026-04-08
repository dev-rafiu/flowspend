import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  showText?: boolean;
}

const Logo = ({ href, className, showText = true }: LogoProps) => {
  const logoContent = (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
        <span className="text-sm font-bold text-white">FS</span>
      </div>
      {showText && (
        <span className="text-xl font-semibold text-slate-900">FlowSpend</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="z-10">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;
