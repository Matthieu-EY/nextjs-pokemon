import Link from 'next/link';
import { DefaultLayout } from './components/DefaultLayout';
export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <h1 className="my-4 text-4xl font-bold">Pokémon</h1>

        <div className="w-[70%] flex-auto flex flex-row justify-around items-center px-16 gap-x-4">
          <Link href="/pokemon">
            <div className='flex justify-center items-center bg-gray-600 rounded-xl min-w-[250px] min-h-[150px]'>
              <p className='text-3xl'>Pokémon</p>
            </div>
          </Link>

          <Link href="/teams">
            <div className='flex justify-center items-center bg-gray-600 rounded-xl min-w-[250px] min-h-[150px]'>
              <p className='text-3xl'>Teams</p>
            </div>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}
