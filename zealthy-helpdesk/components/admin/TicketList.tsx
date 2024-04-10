import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import TicketItem from './TicketItem';
import { TicketType } from '@/types';

export default function TicketList() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [activeHiddenId, setActiveHiddenId] = useState<number | null>(null);

  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    try {
      const { data } = await axios.get(`/api/tickets`);
      setTickets(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error((error as AxiosError).response);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="tickets-container w-[1200px] pl-[1em] pr-[1em] ">
      <table className="w-full text-left table-fixed text-dark-gray">
        <thead className="uppercase bg-green text-white">
          <tr>
            <th scope="col" className="w-[60px] px-5 py-2 rounded-tl-[20px]">
              ID
            </th>
            <th scope="col" className="w-[150px] px-5 py-2">
              Last Updated
            </th>
            <th scope="col" className="w-[120px] px-5 py-2">
              Name
            </th>
            <th scope="col" className="w-[160px] px-5 py-2">
              Email
            </th>
            <th scope="col" className="w-[200px] px-5 py-2">
              Summary
            </th>
            <th scope="col" className="w-[150px] px-5 py-2">
              Status
            </th>
            <th
              scope="col"
              className="w-[60px] px-5 py-2 rounded-tr-[20px]"
            ></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <TicketItem
              ticket={ticket}
              key={index}
              activeHiddenId={activeHiddenId}
              setActiveHiddenId={setActiveHiddenId}
              getTickets={getTickets}
              last={index === tickets.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
