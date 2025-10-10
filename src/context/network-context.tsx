import { createContext, useContext } from "react";
import { useNetwork } from "@/hooks/use-network";

type NetworkContextValue = {
  isOnline: boolean;
};

const NetworkContext = createContext<NetworkContextValue>({
  isOnline: true,
});

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const { isOnline } = useNetwork();
  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkStatus() {
  return useContext(NetworkContext);
}