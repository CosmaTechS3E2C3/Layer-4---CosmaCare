import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listSettlements() {
  return client.get("/settlements");
}

