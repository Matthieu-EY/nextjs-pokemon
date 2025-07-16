-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "size" INTEGER NOT NULL DEFAULT 6,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonCombat" (
    "id" SERIAL NOT NULL,
    "idPokemon" INTEGER NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "PokemonCombat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonCombat" ADD CONSTRAINT "PokemonCombat_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
