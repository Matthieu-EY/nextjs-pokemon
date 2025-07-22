"use server";

import { revalidateTag } from "next/cache";
import { serverTrpc } from "~/app/_trpc/server";

export async function addTeam(name: string) {
  const newTeam = await serverTrpc.team.add({ name });
  return newTeam;
}

export async function invalidateCacheTag(tag: string) {
  revalidateTag(tag);
  // server actions must be async, but revalidateTag is synchronous.
  // This means we need to add this to avoid errors/warnings.
  await Promise.resolve();
}