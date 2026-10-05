import { Request, Response } from "express";
import { pool } from "../../db";

export async function listPolicies(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM governance_policies WHERE active = TRUE");
  res.json(result.rows);
}

