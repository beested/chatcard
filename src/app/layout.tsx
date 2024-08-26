import ContextProvider from '@/context/Gemini';
import ThemeDataProvider from '@/context/theme-data-provider';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuestionsAI',
  description: 'news questions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body className={inter.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider>
            <ThemeDataProvider>{children}</ThemeDataProvider>
          </ContextProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
