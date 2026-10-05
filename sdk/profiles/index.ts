import { CosmaClient } from "../client";

const client = new CosmaClient();

export async function getProfile(address: string) {
  return client.get(`/profiles/${address}`);
}

export async function upsertProfile(payload: any) {
  return client.post("/profiles", payload);
}

