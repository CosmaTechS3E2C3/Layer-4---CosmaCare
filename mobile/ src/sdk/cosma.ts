import { apiGet, apiPost } from "../api/client";

export const CosmaMobileSDK = {
  bookings: {
    list: () => apiGet("/bookings"),
    get: (id: number) => apiGet(`/bookings/${id}`)
  },
  profiles: {
    get: (address: string) => apiGet(`/profiles/${address}`)
  },
  services: {
    list: () => apiGet("/services")
  },
  governance: {
    policies: () => apiGet("/governance/policies"),
    proposals: () => apiGet("/governance/proposals")
  }
};
