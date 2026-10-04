listenToContractEvents("CosmaCareDispute", async (event) => {
  if (event.name === "DisputeRaised") {
    await supabase.from("disputes").insert({
      booking_id: event.args.bookingId,
      raised_by: event.args.raisedBy,
      reason: event.args.reason,
      status: "open",
      created_at: new Date()
    });
  }
});
