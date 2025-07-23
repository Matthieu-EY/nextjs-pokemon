# Pokemon API Client

This directory contains a TypeScript client library for The Pokemon (POKE) API.

## Structure

- `index.ts` - Core fetch function for making requests to Poke API
- `api.ts` - Higher-level API methods for movies and TV shows
- `/dto` - Data Transfer Objects (type definitions) for Poke API responses

## Usage

### Import the API client

```typescript
import pokeApi from '~/lib/poke/api';
```

### Raw Fetch API

If you need to access endpoints not covered by the high-level API:

```typescript
import { fetchPoke } from '~/lib/poke';

// Custom API call
const data = await fetchPoke('/custom/endpoint');
```

## Environment Variables

The Poke client requires two environment variables:
- `POKE_API_URL` - The base URL for the Poke API (usually https://pokeapi.co/)

## tRPC Integration

The Poke API is integrated with tRPC in `src/server/routers/poke.ts`, allowing you to access Pokemon data through typesafe APIs on the client.

Example usage in a component:

```tsx
import { api } from '~/utils/trpc';

// In a React component:
const { data, isLoading } = api.poke.getById({ id: 1 });
```