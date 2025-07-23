'use client';

import { useRef } from 'react';
import { Pokemon } from '~/libs/poke/dto/pokemon';

type PokemonCriesProps = Pokemon['cries'];

export function PokemonCries({ latest, legacy }: PokemonCriesProps) {
  // for playing sounds when user clicks a button
  const soundLatest = useRef<HTMLAudioElement>(null);
  const soundLegacy = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex flex-row gap-x-4 px-2">
      {latest && (
        <figure className="w-full">
          <figcaption>Latest</figcaption>
          <button
            onClick={() =>
              soundLatest.current?.paused
                ? void soundLatest.current.play()
                : soundLatest.current?.pause()
            }
            className="w-full text-center border border-red"
          >
            Play
          </button>
          <audio ref={soundLatest} src={latest} />
        </figure>
      )}

      {legacy && (
        <figure className="w-full">
          <figcaption>Legacy</figcaption>
          <button
            onClick={() =>
              soundLegacy.current?.paused
                ? void soundLegacy.current.play()
                : soundLegacy.current?.pause()
            }
            className="w-full text-center border border-red"
          >
            Play
          </button>
          <audio ref={soundLegacy} src={legacy} />
        </figure>
      )}
    </div>
  );
}
