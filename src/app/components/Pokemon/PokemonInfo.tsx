import { PropsWithChildren } from 'react';

interface PokemonInfoProps {
  name: string;
}

function PokemonInfo({ name, children }: PropsWithChildren<PokemonInfoProps>) {
  return (
    <div className="min-w-[100px] max-w-fit max-h-fit flex flex-col justify-center items-center rounded-lg p-2 bg-stone-400">
      <p>{name}</p>
      <div className="w-full bg-white rounded-lg text-black text-center">
        {children}
      </div>
    </div>
  );
}

export { PokemonInfo };
