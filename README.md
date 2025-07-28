# Pokémon Website

This website is part of the frontend onboarding at EY Fabernovel.
This website allows the user to view info on Pokémon & create Teams.
Originally, the website would have allowed the user to create a battle between teams, but this idea was scrapped due to lack of time.

Have fun with it !

## Tech Stack

- 🧙‍♂️ [tRPC](https://trpc.io) - End-to-end typesafe API
- ⚡ [Next.js](https://nextjs.org/) v15+ with App Router
- 🏢 [Prisma](https://www.prisma.io/) - TypeSafe ORM for SQL
- 🔄 [React Query](https://tanstack.com/query) - Data fetching and caching
- 💨 [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- 🧪 [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/) - Testing
- 🛠️ [TypeScript](https://www.typescriptlang.org/) - Type safety
- 📦 [PNPM](https://pnpm.io/) - Fast, disk space efficient package manager

## Features

- 🔀 App Router based routing with Server and Client Components
- 🔄 End-to-end typesafety with tRPC
- 📁 Database with Prisma
- ⚙️ VSCode extensions
- 🎨 ESLint + Prettier
- 💚 CI setup using GitHub Actions:
  - ✅ E2E testing with Playwright
  - ✅ Linting
- 🔐 Validates your env vars on build and start

## Setup

```bash
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
pnpm
pnpm dx
```

### Requirements

- Node >= 18.0.0
- Postgres
- PNPM package manager

## Development

### Start project

```bash
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
pnpm
pnpm dx
```

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e + unit tests
pnpm test-unit  # runs normal Vitest unit tests
pnpm test-e2e   # runs e2e tests
```

## Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/app/api/trpc/[trpc]/route.ts"><code>./src/app/api/trpc/[trpc]/route.ts</code></a></td>
      <td>tRPC API route handler (App Router)</td>
    </tr>
    <tr>
      <td><a href="./src/app/_trpc/client.ts"><code>./src/app/_trpc/client.ts</code></a></td>
      <td>tRPC client setup</td>
    </tr>
    <tr>
      <td><a href="./src/app/_trpc/provider.tsx"><code>./src/app/_trpc/provider.tsx</code></a></td>
      <td>tRPC provider for client components</td>
    </tr>
    <tr>
      <td><a href="./src/server/routers"><code>./src/server/routers</code></a></td>
      <td>tRPC routers with procedures and business logic</td>
    </tr>
  </tbody>
</table>

---

Originally created by [@alexdotjs](https://twitter.com/alexdotjs).
Updated for App Router.
Developed by Matthieu Sirvan, June 2025
