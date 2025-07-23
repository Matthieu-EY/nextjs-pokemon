'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { TeamFull } from '../Team/TeamsList';

type TeamContext = {
  team: TeamFull | null;
  setTeam: Dispatch<SetStateAction<TeamFull | null>>;
};

export const teamContext = createContext<TeamContext>({} as TeamContext);

export function Provider({ children }: PropsWithChildren) {
  const [team, setTeam] = useState<TeamFull | null>(null);

  return (
    <teamContext.Provider value={{ team, setTeam }}>
      {children}
    </teamContext.Provider>
  );
}
