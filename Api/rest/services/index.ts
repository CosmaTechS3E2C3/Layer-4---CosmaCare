import { Request, Response } from "express";
import { pool } from "../../db";

export async function listServices(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM services WHERE active = TRUE ORDER BY id");
  res.json(result.rows);
}

