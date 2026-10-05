import { pool } from "../backend/db";

export async function syncDispute(data) {
  await pool.query(
    `INSERT INTO disputes (
      booking_id, raised_by, reason, status, tx_hash
    ) VALUES ($1,$2,$3,'open',$4)`,
    [data.bookingId, data.raisedBy, data.reason, data.txHash]
  );
}

