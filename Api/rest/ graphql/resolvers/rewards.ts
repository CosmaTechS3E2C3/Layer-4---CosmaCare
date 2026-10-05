import { pool } from "../db";

export const RewardResolvers = {
  Query: {
    rewards: async () => {
      const result = await pool.query("SELECT * FROM rewards ORDER BY minted_at DESC");
      return result.rows;
    },
    reward: async (_: any, { id }: { id: number }) => {
      const result = await pool.query("SELECT * FROM rewards WHERE id = $1", [id]);
      return result.rows[0];
    }
  }
};

