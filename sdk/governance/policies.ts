import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listPolicies() {
  return client.get("/governance/policies");
}
