"use server";

import { serverTrpc } from "~/app/_trpc/server";

export async function addTeam(name: string) {
  const newTeam = await serverTrpc.team.add({ name });
  return newTeam;
}