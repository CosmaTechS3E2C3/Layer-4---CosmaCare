import { Request, Response } from "express";
import { pool } from "../../db";

export async function getProfile(req: Request, res: Response) {
  const { address } = req.params;
  const result = await pool.query("SELECT * FROM profiles WHERE address = $1", [address]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
  res.json(result.rows[0]);
}

export async function upsertProfile(req: Request, res: Response) {
  const { address, did, role } = req.body;
  await pool.query(
    `INSERT INTO profiles (address, did, role)
     VALUES ($1, $2, $3)
     ON CONFLICT (address)
     DO UPDATE SET did = EXCLUDED.did, role = EXCLUDED.role, updated_at = NOW()`,
    [address, did, role]
  );
  res.status(200).json({ address });
}

