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
      <Header currentView='user'/>
      <main>
        <div className="w-60 bg-gray-200 border rounded-sm">
          <h2>Create a new ticket:</h2>
          <TicketSubmissionForm />
        </div>
      </main>
    </>
  );
}
