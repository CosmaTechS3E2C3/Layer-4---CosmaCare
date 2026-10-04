listenToContractEvents("CosmaCareSettlement", async (event) => {
  if (event.name === "SettlementExecuted") {
    await supabase.from("settlements").insert({
      booking_id: event.args.bookingId,
      total_amount: event.args.totalAmount,
      provider_amount: event.args.providerAmount,
      platform_amount: event.args.platformAmount,
      partner_amount: event.args.partnerAmount,
      burn_amount: event.args.burnAmount,
      token_symbol: "S1",
      settled_at: new Date(),
      tx_hash: event.transactionHash
    });

    await supabase.from("bookings")
      .update({ status: "settled" })
      .eq("id", event.args.bookingId);
  }
});
