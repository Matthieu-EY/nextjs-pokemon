import { Type } from "~/libs/poke/dto/common";

const types = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

interface PokemonSearchProps {
  searchedName: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
  searchedType?: string;
  setSearchedType: React.Dispatch<React.SetStateAction<Type | "All">>;
}

export function PokemonSearch({ searchedName, setSearchedName, searchedType, setSearchedType }: PokemonSearchProps) {
  return (
    <div className="flex flew-row justify-around">
      <div className="flex flex-col justify-center items-center">
        <p>Search by name</p>
        <input
          name="name_search"
          type="text"
          placeholder="Pikachu"
          defaultValue={searchedName}
          onChange={(e) => setSearchedName(e.target.value)}
          className=" bg-gray-700 border-gray-600 rounded-lg min-w-[200px] px-2"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p>Search by type</p>
        <select
          defaultValue={searchedType ?? "All"}
          onChange={(e) => setSearchedType(e.target.value as Type | 'All')}
        >
          <option value="All" defaultChecked>
            All
          </option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}