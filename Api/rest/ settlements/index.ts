import { Request, Response } from "express";
import { pool } from "../../db";

export async function listSettlements(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM settlements ORDER BY settled_at DESC");
  res.json(result.rows);
}

