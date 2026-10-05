import { pool } from "../db";

export const GovernanceResolvers = {
  Query: {
    governancePolicies: async () => {
      const result = await pool.query("SELECT * FROM governance_policies WHERE active = TRUE");
      return result.rows;
    },
    governanceProposals: async () => {
      const result = await pool.query("SELECT * FROM governance_proposals ORDER BY created_at DESC");
      return result.rows;
    },
    governanceVotes: async (_: any, { proposal_id }: { proposal_id: number }) => {
      const result = await pool.query(
        "SELECT * FROM governance_votes WHERE proposal_id = $1 ORDER BY created_at DESC",
        [proposal_id]
      );
      return result.rows;
    }
  }
};

