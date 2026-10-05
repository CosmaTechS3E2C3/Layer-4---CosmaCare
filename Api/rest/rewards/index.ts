import { Request, Response } from "express";
import { pool } from "../../db";

export async function listRewards(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM rewards ORDER BY minted_at DESC");
  res.json(result.rows);
}

