import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function resolveDid(address: string) {
  return client.get(`/profiles/${address}`);
}

