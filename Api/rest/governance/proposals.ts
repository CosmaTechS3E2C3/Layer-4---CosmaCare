import { Request, Response } from "express";
import { pool } from "../../db";

export async function listProposals(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM governance_proposals ORDER BY created_at DESC");
  res.json(result.rows);
}

