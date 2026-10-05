import { ENV } from "../config";

export function useCosmaSDK() {
  const apiGet = async (path: string) =>
    (await fetch(`${ENV.apiBase}${path}`)).json();

  const apiPost = async (path: string, body: any) =>
    (await fetch(`${ENV.apiBase}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })).json();

  return {
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
}

