"use server";

import { revalidateTag } from "next/cache";
import { serverTrpc } from "~/app/_trpc/server";

export async function invalidateCacheTag(tag: string) {
  // revalidateTag is server only, hence this server action
  revalidateTag(tag);
  // server actions must be async, but revalidateTag is synchronous.
  // This means we need to add this to avoid errors/warnings.
  await Promise.resolve();
}

export async function addTeam(name: string) {
  const newTeam = await serverTrpc.team.add({ name });
  revalidateTag("teamList");
  return newTeam;
}

export async function deleteTeam(idTeam: number) {
  const oldTeam = await serverTrpc.team.delete({ id: idTeam });
  revalidateTag("teamList");
  return oldTeam;
}

export async function addPokemonToTeam(idPokemon: number, teamId: number) {
  const newPokemon = await serverTrpc.pokeCombat.add({ idPokemon: idPokemon, idTeam: teamId });
  revalidateTag("teamList");
  return newPokemon;
}

export async function deletePokemonFromTeam(idPokemon: number, idTeam: number) {
  await serverTrpc.pokeCombat.deletePokemonInTeam({ idPokemon: idPokemon, idTeam: idTeam });
  revalidateTag("teamList");
}