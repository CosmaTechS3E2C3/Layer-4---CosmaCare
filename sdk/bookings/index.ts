import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listBookings() {
  return client.get("/bookings");
}

export async function getBooking(id: number) {
  return client.get(`/bookings/${id}`);
}

export async function createBooking(payload: any) {
  return client.post("/bookings", payload);
}

