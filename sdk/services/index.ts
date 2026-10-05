import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function listServices() {
  return client.get("/services");
}

