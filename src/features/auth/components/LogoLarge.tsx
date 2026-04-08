import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoLargeProps {
  href?: string;
  className?: string;
  showText?: boolean;
}

const LogoLarge = ({ href, className, showText = true }: LogoLargeProps) => {
  const logoContent = (
    <div className={cn("flex items-center space-x-4", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-800">
        <span className="text-2xl font-bold text-white">FS</span>
      </div>
      {showText && (
        <span className="text-4xl font-semibold text-slate-900">FlowSpend</span>
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

export default LogoLarge;
