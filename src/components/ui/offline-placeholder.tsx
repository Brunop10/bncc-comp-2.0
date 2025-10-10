import { cn } from "@/lib/utils";
import { WifiOff } from "lucide-react";

interface OfflinePlaceholderProps {
  className?: string;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function OfflinePlaceholder({
  className,
  title = "Sem conexão com a internet",
  description = "Não é possível buscar dados agora",
  size = "xl",
}: OfflinePlaceholderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
    xl: "w-28 h-28",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 py-16", className)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 border-purple-300/70 shadow-lg bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex items-center justify-center",
          sizeClasses[size]
        )}
      >
        <WifiOff className="w-12 h-12 text-white drop-shadow-sm" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-primary">{title}</p>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}