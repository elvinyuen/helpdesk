import Link from 'next/link';
import link from 'next/link';

interface HeaderProps {
  currentView: string;
}

export default function Header({ currentView }: HeaderProps) {
  return (
    <section className="add tw styling">
      <div>
        <h1>
          Welcome to the {currentView === 'user' ? 'User' : 'Admin'} Portal
        </h1>
      </div>
      <nav>
        {currentView === 'user' ? (
          <Link href="/admin">Admin Portal</Link>
        ) : (
          <Link href="/client">Client Portal</Link>
        )}
      </nav>
    </section>
  );
}
