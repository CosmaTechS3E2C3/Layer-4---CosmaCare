import { listenToContractEvents } from "./chain";
import { supabase } from "./client";

listenToContractEvents("CosmaCareBooking", async (event) => {
  if (event.name === "BookingCreated") {
    await supabase.from("bookings").insert({
      id: event.args.id,
      client_address: event.args.client,
      provider_address: event.args.provider,
      service_id: event.args.serviceId,
      scheduled_at: new Date(event.args.scheduledAt * 1000),
      status: "pending",
      tx_hash_create: event.transactionHash
    });
  }
});
