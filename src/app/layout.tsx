import './globals.css';
import { Raleway } from 'next/font/google';
import type { Metadata } from 'next';
import { TRPCProvider } from '~/app/_trpc/provider';
import { Provider } from './components/Provider/Provider';
import { TeamBanner } from './components/Team/TeamBanner';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Mini-projet Pokemon avec tRPC, Prisma, et Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.className}>
      <body className="antialiased">
        <TRPCProvider>
          <Provider>
            {children}
            <TeamBanner />
          </Provider>
        </TRPCProvider>
      </body>
    </html>
  );
}
