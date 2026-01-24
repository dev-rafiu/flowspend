import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ href, className, showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: {
      icon: "h-6 w-6",
      text: "text-sm",
      iconText: "text-xs",
    },
    md: {
      icon: "h-8 w-8",
      text: "text-xl",
      iconText: "text-sm",
    },
    lg: {
      icon: "h-10 w-10",
      text: "text-2xl",
      iconText: "text-base",
    },
  };

  const sizes = sizeClasses[size];

  const logoContent = (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-slate-800",
          sizes.icon
        )}
      >
        <span className={cn("font-bold text-white", sizes.iconText)}>FS</span>
      </div>
      {showText && (
        <span className={cn("font-semibold text-slate-900", sizes.text)}>
          FlowSpend
        </span>
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
