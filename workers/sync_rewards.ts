import { pool } from "../backend/db";

export async function syncReward(data) {
  await pool.query(
    `INSERT INTO rewards (
      booking_id, provider_address, credit_amount, token_symbol, reason_code, tx_hash
    ) VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      data.bookingId,
      data.provider,
      data.amount,
      data.tokenSymbol,
      data.reasonCode,
      data.txHash
    ]
  );
}

