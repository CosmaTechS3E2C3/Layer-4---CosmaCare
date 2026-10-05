import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listRewards() {
  return client.get("/rewards");
}

