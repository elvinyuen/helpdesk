import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import TicketItem from './TicketItem';
import { TicketType } from '@/types';

export default function TicketList() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [activeHiddenId, setActiveHiddenId] = useState<number | null>(null);
  const [sortedBy, setSortedBy] = useState('date');

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

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortedBy(event.target.value);
  }

  const sortedTickets = tickets;
  if (sortedBy === 'date') {
    sortedTickets.sort(
      (a: TicketType, b: TicketType) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (sortedBy === 'name') {
    sortedTickets.sort(
      (a: TicketType, b: TicketType) =>
        a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0)
    );
  } else if (sortedBy === 'status') {
    const statusObj: { [key: string]: number } = {
      new: 1,
      'in-progress': 2,
      resolved: 3,
    };
    sortedTickets.sort(
      (a: TicketType, b: TicketType) =>
        statusObj[a.status] - statusObj[b.status]
    );
  }

  return (
    <div className="tickets-container w-[1200px] px-[1em] flex flex-col">
      <div className="flex py-[1em] justify-center">
        <label
          htmlFor="sorting"
          className="px-2 pt-[2px] text-[small] text-center align-middle"
        >
          Sort tickets by{' '}
        </label>
        <select
          name="sorting"
          id="sorting"
          className="bg-white border border-light-gray text-gray text-[small] rounded-lg focus:ring-light-green focus:border-light-green block w-[150px] h-[30px]"
          onChange={handleSortChange}
        >
          <option value="date">Submission Date</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
      </div>
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
              Subject
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
          {sortedTickets.map((ticket, index) => (
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
