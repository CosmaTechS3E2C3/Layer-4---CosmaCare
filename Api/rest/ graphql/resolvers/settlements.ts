import { pool } from "../db";

export const SettlementResolvers = {
  Query: {
    settlements: async () => {
      const result = await pool.query("SELECT * FROM settlements ORDER BY settled_at DESC");
      return result.rows;
    },
    settlement: async (_: any, { id }: { id: number }) => {
      const result = await pool.query("SELECT * FROM settlements WHERE id = $1", [id]);
      return result.rows[0];
    }
  }
};

