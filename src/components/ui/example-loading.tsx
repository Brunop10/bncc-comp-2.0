import { cn } from "@/lib/utils";

interface ExampleLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ExampleLoading({ size = "md", className }: ExampleLoadingProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-28 h-32",
    lg: "w-32 h-40",
    xl: "w-40 h-48",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Grupo da lâmpada, sem fundo de folha */}
      <div className="relative">
        {/* Glow pulsante com tom roxo */}
        <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-purple-400/25 blur-md animate-[ideaPulse_2.8s_ease-in-out_infinite]"></div>

        {/* Bulbo com preenchimento roxo animado de baixo para cima */}
        <div className="relative w-14 h-14 rounded-full bg-white/10 shadow-2xl ring-4 ring-purple-400/30 overflow-hidden">
          {/* Camada de preenchimento roxo (bottom-to-top) */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-500 to-purple-400 animate-[fillBottom_2.6s_ease-in-out_infinite]"></div>
          </div>
          {/* Destaque suave */}
          <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
          {/* Brilho lateral em movimento */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-transparent to-transparent opacity-40 animate-[shimmer_2.8s_linear_infinite]"></div>
        </div>

        {/* Pescoço (ligação ao bulbo) */}
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-200 rounded-sm shadow-sm"></div>

        {/* Base roscada com listras horizontais */}
        <div className="absolute top-[54px] left-1/2 -translate-x-1/2 w-8 h-5 rounded-sm shadow-md bg-[repeating-linear-gradient(180deg,rgba(160,160,180,0.9)_0px,rgba(160,160,180,0.9)_2px,rgba(230,230,240,0.9)_2px,rgba(230,230,240,0.9)_4px)]"></div>

        {/* Ponta final */}
        <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-2 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* Raios em roxo claro, alternando animações */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]">
        {/* Cima */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-6 bg-purple-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]"></div>
        {/* Diagonais */}
        <div className="absolute -top-2 left-[calc(50%+22px)] w-1 h-5 bg-purple-300 rounded-full rotate-45 animate-[sparkle_2.4s_ease-in-out_infinite]"></div>
        <div className="absolute -top-2 left-[calc(50%-22px)] w-1 h-5 bg-purple-300 rounded-full -rotate-45 animate-[sparkle_2.6s_ease-in-out_infinite]"></div>
        {/* Lados */}
        <div className="absolute top-2 left-[calc(50%+28px)] w-5 h-1 bg-purple-300 rounded-full animate-[sparkle_2.8s_ease-in-out_infinite]"></div>
        <div className="absolute top-2 left-[calc(50%-32px)] w-5 h-1 bg-purple-300 rounded-full animate-[sparkle_3s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}