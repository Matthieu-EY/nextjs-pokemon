import { DefaultLayout } from "~/components/DefaultLayout";
import { TeamsList } from "../components/Team/TeamsList";
import { serverTrpc } from "../_trpc/server";


export default async function TeamsPage() {
  const teams = await serverTrpc.team.list({});

  // TODO: add request for all pokemons corresponding to each Team

  return (
    <DefaultLayout>
      <TeamsList teams={teams} />
    </DefaultLayout>
  )
}