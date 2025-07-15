'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { DefaultLayout } from './components/DefaultLayout';
import { trpc } from './_trpc/client';

export default function HomePage() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });
  const utils = trpc.useUtils();
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.list.invalidate();
      setFormData({ title: '', text: '' });
    },
  });

  /*
  const ditto = trpc.poke.getPokemonById.useQuery({
    id: 35
  });
  const pokemons = trpc.poke.list.useQuery({
    cursor: "50",
    limit: 50,
  });
  */

  return (
    <DefaultLayout>
      <div className="flex flex-col bg-gray-800 py-8">
        <h1 className="text-4xl font-bold">
          Welcome to your tRPC with Prisma starter!
        </h1>
        <p className="text-gray-400">
          If you get stuck, check{' '}
          <Link className="underline" href="https://trpc.io">
            the docs
          </Link>
          , write a message in our{' '}
          <Link className="underline" href="https://trpc.io/discord">
            Discord-channel
          </Link>
          , or write a message in{' '}
          <Link
            className="underline"
            href="https://github.com/trpc/trpc/discussions"
          >
            GitHub Discussions
          </Link>
          .
        </p>

        <div className="mt-8">
          <div className="mb-4 flex gap-4">
            <input
              className="rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
              placeholder="Title"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
              }}
              value={formData.title}
            />
            <input
              className="rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
              placeholder="Text"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, text: e.target.value }));
              }}
              value={formData.text}
            />
            <button
              className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
              onClick={() => {
                addPost.mutate({
                  title: formData.title,
                  text: formData.text,
                });
              }}
              disabled={addPost.isPending}
            >
              {addPost.isPending ? 'Loading...' : 'Add'}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {postsQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id ?? index}>
              {page.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-gray-600 bg-gray-700 p-4"
                >
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-gray-400">{item.text}</p>
                  <Link
                    href={`/post/${item.id}`}
                    className="mt-2 inline-block rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
                  >
                    View
                  </Link>
                </div>
              ))}
            </Fragment>
          ))}
          <div className="flex justify-center">
            <button
              className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
              onClick={() => void postsQuery.fetchNextPage()}
              disabled={
                !postsQuery.hasNextPage || postsQuery.isFetchingNextPage
              }
            >
              {postsQuery.isFetchingNextPage
                ? 'Loading more...'
                : postsQuery.hasNextPage
                  ? 'Load more'
                  : 'No more posts'}
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
