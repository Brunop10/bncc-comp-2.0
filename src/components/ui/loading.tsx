import { cn } from "@/lib/utils";

interface LoadingBookProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingBook({ size = "md", className }: LoadingBookProps) {
  const sizeClasses = {
    sm: "w-10 h-14",
    md: "w-14 h-20", 
    lg: "w-16 h-24",
    xl: "w-20 h-28"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-r-md border-2 border-gray-300 shadow-lg overflow-hidden">
        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-gray-300 to-gray-400 rounded-l-sm"></div>
        
        <div className="absolute right-0 top-1 w-0.5 h-[calc(100%-8px)] bg-white rounded-r-sm shadow-sm"></div>
        <div className="absolute right-1 top-2 w-0.5 h-[calc(100%-16px)] bg-white/80 rounded-r-sm"></div>
        <div className="absolute right-2 top-3 w-0.5 h-[calc(100%-24px)] bg-white/60 rounded-r-sm"></div>
        
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-6 h-1 bg-gray-400/50 rounded mb-1"></div>
          <div className="w-8 h-1 bg-gray-400/50 rounded mb-1"></div>
          <div className="w-4 h-1 bg-gray-400/50 rounded"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-1">
          <div className="w-5 h-0.5 bg-gray-400/30 rounded"></div>
          <div className="w-6 h-0.5 bg-gray-400/30 rounded"></div>
          <div className="w-4 h-0.5 bg-gray-400/30 rounded"></div>
          <div className="w-7 h-0.5 bg-gray-400/30 rounded"></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-primary to-purple-600 rounded-r-md border-2 border-purple-500/70 shadow-xl overflow-hidden animate-[paintBook_5s_ease-in-out_infinite]">
        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-500 via-primary to-purple-700 rounded-l-sm shadow-inner"></div>
        
        <div className="absolute right-0 top-1 w-0.5 h-[calc(100%-8px)] bg-white rounded-r-sm shadow-sm"></div>
        <div className="absolute right-1 top-2 w-0.5 h-[calc(100%-16px)] bg-white/90 rounded-r-sm"></div>
        <div className="absolute right-2 top-3 w-0.5 h-[calc(100%-24px)] bg-white/70 rounded-r-sm"></div>
        
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-6 h-1 bg-white/95 rounded mb-1 shadow-sm"></div>
          <div className="w-8 h-1 bg-white/95 rounded mb-1 shadow-sm"></div>
          <div className="w-4 h-1 bg-white/95 rounded shadow-sm"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-1">
          <div className="w-5 h-0.5 bg-white/80 rounded shadow-sm"></div>
          <div className="w-6 h-0.5 bg-white/80 rounded shadow-sm"></div>
          <div className="w-4 h-0.5 bg-white/80 rounded shadow-sm"></div>
          <div className="w-7 h-0.5 bg-white/80 rounded shadow-sm"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-purple-400/20 animate-[colorWave_4s_ease-in-out_infinite] rounded-r-md"></div>
        
        <div className="absolute top-3 left-3 w-3 h-8 bg-gradient-to-b from-white/60 to-purple-200/40 rounded-sm animate-[sparkle_3s_ease-in-out_infinite] delay-1000"></div>
      </div>

      <div className="absolute -bottom-2 left-1 right-1 h-3 bg-gradient-to-r from-purple-500/20 via-primary/30 to-purple-600/20 rounded-full blur-lg animate-[paintSpread_5s_ease-in-out_infinite]"></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-white/8 rounded-r-md pointer-events-none animate-[sparkle_5s_ease-in-out_infinite]"></div>
    </div>
  );
}