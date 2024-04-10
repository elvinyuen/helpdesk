import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import helpDeskLogo from '@/public/help-desk-logo.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Help Desk Support</title>
      </Head>
      <main className="bg-dark-cream justify-center items-center w-[1200px] mt-[3em] ml-auto mr-auto flex rounded-[60px] pt-[40px] pb-[40px] flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-[Mulish,_sans-serif] text-[50px] font-bold leading-[44p] m-10">
          Welcome to the Help Desk Support
        </h1>
        <Image src={helpDeskLogo} alt='help desk logo' width={200} className="m-10"/>
        <div className="m-10">
          <Link href="/client">
            <button className="bg-dark-green text-white text-center rounded-[100px] min-w-[300px] px-[30px] py-[16px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-green">
              Go to User Portal
            </button>
          </Link>
        </div>
        <div className="m-10">
          <Link href="/admin">
            <button className="bg-dark-green text-white text-center rounded-[100px] min-w-[300px] px-[30px] py-[16px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-green">
              Go to Admin Portal
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
