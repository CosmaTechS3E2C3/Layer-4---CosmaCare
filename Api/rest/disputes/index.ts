import { Request, Response } from "express";
import { pool } from "../../db";

export async function listDisputes(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM disputes ORDER BY created_at DESC");
  res.json(result.rows);
}

