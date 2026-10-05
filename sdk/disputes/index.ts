import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listDisputes() {
  return client.get("/disputes");
}

