import { useAPI } from "./useAPI";

export function useCosmaSDK() {
  const api = useAPI();

  return {
    // BOOKINGS
    listBookings: () => api.get("/bookings"),
    getBooking: (id: number) => api.get(`/bookings/${id}`),
    createBooking: (payload: any) => api.post("/bookings", payload),
    updateBookingStatus: (id: number, status: string) =>
      api.put(`/bookings/${id}/status`, { status }),

    // DISPUTES
    openDispute: (bookingId: number, reason: string) =>
      api.post("/disputes", { bookingId, reason }),
    resolveDispute: (id: number, resolutionNote: string, status: string) =>
      api.put(`/disputes/${id}/resolve`, { resolutionNote, status }),

    // SETTLEMENTS
    listSettlements: () => api.get("/settlements"),
    getSettlement: (id: number) => api.get(`/settlements/${id}`),

    // REWARDS
    listRewards: () => api.get("/rewards"),
    getReward: (id: number) => api.get(`/rewards/${id}`)
  };
}

