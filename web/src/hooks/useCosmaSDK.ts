import { useMemo } from "react";
// imagine this is your Layer3c App SDK
import { CosmaSDK } from "@cosmatech/app-sdk";

export function useCosmaSDK() {
  const sdk = useMemo(() => {
    return new CosmaSDK({
      apiBase: import.meta.env.VITE_COSMA_API_BASE,
    });
  }, []);
  return sdk;
}

