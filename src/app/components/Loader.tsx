'use client';

import { TailSpin } from 'react-loader-spinner';

export function Loading() {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <TailSpin
        width={80}
        height={80}
        color="#FFFFFF"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
}
