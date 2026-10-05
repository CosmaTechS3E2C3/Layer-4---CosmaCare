import { pool } from "../db";

export const ProfileResolvers = {
  Query: {
    profiles: async () => {
      const result = await pool.query("SELECT * FROM profiles ORDER BY created_at DESC");
      return result.rows;
    },
    profile: async (_: any, { address }: { address: string }) => {
      const result = await pool.query("SELECT * FROM profiles WHERE address = $1", [address]);
      return result.rows[0];
    }
  }
};

