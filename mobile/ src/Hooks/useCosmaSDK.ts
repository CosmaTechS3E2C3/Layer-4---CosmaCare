import { useMemo } from "react";
import { CosmaMobileSDK } from "../sdk/cosma";

export function useCosmaSDK() {
  // Memoize the SDK instance so it never re‑creates unnecessarily
  const sdk = useMemo(() => CosmaMobileSDK, []);

  return {
    bookings: {
      list: sdk.bookings.list,
      get: sdk.bookings.get
    },
    profiles: {
      get: sdk.profiles.get
    },
    services: {
      list: sdk.services.list
    },
    governance: {
      policies: sdk.governance.policies,
      proposals: sdk.governance.proposals
    }
  };
}

