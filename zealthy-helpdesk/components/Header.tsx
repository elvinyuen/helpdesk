import link from 'next/link';

export default function Header() {
  return (
    <section className="add tw styling">
      <div>
        <h1>Welcome to the User Portal</h1>
      </div>
      <nav>
        <button>User Portal</button>
        <button>Admin Portal</button>
      </nav>
    </section>
  );
}
