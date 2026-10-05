import { ethers } from "ethers";
import { emitRealtime } from "./emit_realtime_events";

export async function listenToChainEvents() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const contract = new ethers.Contract(
    process.env.BOOKING_CONTRACT,
    require("../interfaces/IBooking.json"),
    provider
  );

  contract.on("BookingLifecycleEvent", async (...args) => {
    await emitRealtime("booking.lifecycle", args);
  });

  contract.on("DisputeOpened", async (...args) => {
    await emitRealtime("dispute.created", args);
  });

  contract.on("DisputeResolved", async (...args) => {
    await emitRealtime("dispute.resolved", args);
  });

  contract.on("RewardMinted", async (...args) => {
    await emitRealtime("reward.minted", args);
  });

  contract.on("SettlementExecuted", async (...args) => {
    await emitRealtime("settlement.created", args);
  });
}

