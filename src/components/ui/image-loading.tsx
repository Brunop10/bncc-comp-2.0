import { cn } from "@/lib/utils";

interface ImageLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ImageLoading({ size = "md", className }: ImageLoadingProps) {
  const sizeClasses = {
    sm: "w-24 h-16",
    md: "w-32 h-24", 
    lg: "w-48 h-32",
    xl: "w-64 h-48"
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-md", sizeClasses[size], className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300">
        <div className="absolute inset-2 space-y-2">
          <div className="w-full h-2 bg-gray-300/50 rounded"></div>
          <div className="w-3/4 h-2 bg-gray-300/50 rounded"></div>
          <div className="w-1/2 h-2 bg-gray-300/50 rounded"></div>
          <div className="w-5/6 h-2 bg-gray-300/50 rounded"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-primary to-purple-600 border border-purple-500/70 animate-[fillImage_4s_ease-in-out_infinite]">

        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-purple-400/20 animate-[shimmer_3s_ease-in-out_infinite] delay-500"></div>
        
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/80 rounded-full animate-[sparkle_2s_ease-in-out_infinite] delay-1000"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/60 rounded-full animate-[sparkle_2.5s_ease-in-out_infinite] delay-1500"></div>
      </div>
      
      <div className="absolute -bottom-1 left-1 right-1 h-2 bg-gradient-to-r from-purple-500/20 via-primary/30 to-purple-600/20 rounded-full blur-sm animate-[loadingShadow_4s_ease-in-out_infinite]"></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-white/5 rounded-lg pointer-events-none animate-[finalShine_4s_ease-in-out_infinite]"></div>
    </div>
  );
}