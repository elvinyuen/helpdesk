import Header from '@/components/Header';
import Head from 'next/head';
import TicketList from '@/components/admin/TicketList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Help Desk - Admin Portal</title>
      </Head>
      <Header currentView="admin" />
      <main className="bg-dark-cream justify-center items-center w-[1200px] mt-[3em] ml-auto mr-auto flex rounded-[60px] pt-[40px] pb-[40px]">
        <section>
          <h2
            className="text-center p-1 text-[36px] font-bold leading-[44px]
          "
          >
            Help Desk Tickets
          </h2>
          <TicketList />
        </section>
      </main>
    </>
  );
}
