import Link from 'next/link';
import link from 'next/link';

interface HeaderProps {
  currentView: string;
}

export default function Header({ currentView }: HeaderProps) {
  return (
    <section className={`bg-softgreen`}>
      <div className="justify-between items-center w-[1200px] h-[100px] ml-auto mr-auto flex">
        <div
          className="float-left text-[#333] no-underline relative
"
        >
          <h1 className="color-dark-gray text-center font-[Mulish,_sans-serif] text-[50px] font-bold leading-[44px] [text-shadow:0_0_20px_light-gray]">
            {currentView === 'user' ? 'User' : 'Admin'} Portal
          </h1>
        </div>
        <nav
          className={`justify-around items-center flex
`}
        >
          <Link href="/">
            <button className="bg-dark-green text-[small] text-white text-center rounded-[100px] min-w-[100px] px-[30px] py-[10px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-green m-2">
              Home
            </button>
          </Link>
          <Link href={currentView === 'user' ? '/admin' : '/client'}>
            <button className="bg-dark-green text-[small] text-white text-center rounded-[100px] min-w-[100px] px-[30px] py-[10px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-green m-2">
              Go to {currentView === 'user' ? 'Admin' : 'User'} Portal
            </button>
          </Link>
        </nav>
      </div>
    </section>
  );
}
