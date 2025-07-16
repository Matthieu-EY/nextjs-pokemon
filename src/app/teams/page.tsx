import { DefaultLayout } from "~/components/DefaultLayout";
import { TeamsList } from "../components/Team/TeamsList";


export default function TeamsPage() {
  // TODO: fetch teams here

  return (
    <DefaultLayout>
      <TeamsList teams={[]} />
    </DefaultLayout>
  )
}