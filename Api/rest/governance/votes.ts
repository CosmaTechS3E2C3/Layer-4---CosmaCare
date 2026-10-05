import { Request, Response } from "express";
import { pool } from "../../db";

export async function listVotes(req: Request, res: Response) {
  const { proposalId } = req.params;
  const result = await pool.query(
    "SELECT * FROM governance_votes WHERE proposal_id = $1 ORDER BY created_at DESC",
    [proposalId]
  );
  res.json(result.rows);
}

