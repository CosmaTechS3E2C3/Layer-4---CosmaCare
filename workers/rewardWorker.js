listenToContractEvents("CosmaCareRewards", async (event) => {
  if (event.name === "RewardMinted") {
    await supabase.from("rewards").insert({
      booking_id: event.args.bookingId,
      provider_address: event.args.provider,
      credit_amount: event.args.amount,
      token_symbol: event.args.token,
      reason_code: event.args.reason,
      minted_at: new Date(),
      tx_hash: event.transactionHash
    });
  }
});
