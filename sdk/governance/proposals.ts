import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listProposals() {
  return client.get("/governance/proposals");
}

