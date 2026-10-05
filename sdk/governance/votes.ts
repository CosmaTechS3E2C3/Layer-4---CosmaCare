import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listVotes(proposalId: number) {
  return client.get(`/governance/votes/${proposalId}`);
}
