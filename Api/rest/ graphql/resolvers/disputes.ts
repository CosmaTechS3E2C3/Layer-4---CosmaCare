import { pool } from "../db";

export const DisputeResolvers = {
  Query: {
    disputes: async () => {
      const result = await pool.query("SELECT * FROM disputes ORDER BY created_at DESC");
      return result.rows;
    },
    dispute: async (_: any, { id }: { id: number }) => {
      const result = await pool.query("SELECT * FROM disputes WHERE id = $1", [id]);
      return result.rows[0];
    }
  }
};

