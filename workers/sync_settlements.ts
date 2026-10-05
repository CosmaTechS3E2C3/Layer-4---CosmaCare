import { pool } from "../backend/db";

export async function syncSettlement(data) {
  await pool.query(
    `INSERT INTO settlements (
      booking_id, total_amount, provider_amount, platform_amount,
      partner_amount, burn_amount, token_symbol, tx_hash
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      data.bookingId,
      data.totalAmount,
      data.providerAmount,
      data.platformAmount,
      data.partnerAmount,
      data.burnAmount,
      data.tokenSymbol,
      data.txHash
    ]
  );
}

