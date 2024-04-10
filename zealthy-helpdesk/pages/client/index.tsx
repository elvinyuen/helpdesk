import Header from '@/components/Header';
import Head from 'next/head';
import TicketSubmissionForm from '@/components/client/TicketSubmissionForm';

import { Inter } from 'next/font/google';

export default function Home() {
  return (
    <>
      <Head>
        <title>Help Desk - User Portal</title>
      </Head>
      <Header currentView="user" />
      <main className="bg-dark-cream justify-center items-center w-[1200px] mt-[3em] ml-auto mr-auto flex rounded-[60px] pt-[40px] pb-[40px]">
        <section>
          <h2 className="text-center mt-0 mb-6 font-[Mulish,_sans-serif] text-[36px] font-bold leading-[44px]">
            Submit a new support request
          </h2>
          <TicketSubmissionForm />
        </section>
      </main>
    </>
  );
}
