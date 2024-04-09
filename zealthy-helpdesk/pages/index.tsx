import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <a href="/client">User Portal</a>
      <a href="/admin">Admin Portal</a>
    </main>
  );
}
