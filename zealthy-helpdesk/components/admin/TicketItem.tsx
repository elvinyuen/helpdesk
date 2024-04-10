import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { TicketType } from '@/types';
import caretImage from '@/public/caret-down.svg';

interface TicketProps {
  ticket: TicketType;
  activeHiddenId: number | null;
  setActiveHiddenId: React.Dispatch<
    React.SetStateAction<TicketProps['activeHiddenId']>
  >;
  getTickets: () => Promise<void>;
  last: boolean;
}

interface TicketUpdatesType {
  ticket_id: number;
  status: string;
  reply: string;
}

export default function TicketItem({
  ticket,
  activeHiddenId,
  setActiveHiddenId,
  getTickets,
  last,
}: TicketProps) {
  const [updatedStatus, setUpdatedStatus] = useState(ticket.status);
  const [updatedReply, setUpdatedReply] = useState(
    ticket.reply ? ticket.reply : ''
  );

  function showHiddenRow(ticketId: number) {
    const hiddenRow = document.getElementById(`hidden-row-${ticketId}`);
    if (activeHiddenId !== null && activeHiddenId !== ticketId) {
      const activeHiddenRow = document.getElementById(
        `hidden-row-${activeHiddenId}`
      );
      if (activeHiddenRow) {
        activeHiddenRow.classList.add('hidden');
      }
    }
    if (hiddenRow) {
      hiddenRow.classList.toggle('hidden');
      if (!hiddenRow.classList.contains('hidden')) {
        setActiveHiddenId(ticketId);
      } else {
        setActiveHiddenId(null);
      }
    }
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUpdatedStatus(event.target.value);
  }

  function handleReplyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUpdatedReply(event.target.value);
  }

  const {
    ticket_id,
    created_at,
    updated_at,
    name,
    email,
    summary,
    description,
    status,
    reply,
  } = ticket;

  function handleUpdateTicket() {
    const ticketUpdates: TicketUpdatesType = {
      ticket_id,
      status: updatedStatus,
      reply: updatedReply,
    };
    updateTicket(ticketUpdates);
  }

  async function updateTicket(newData: TicketUpdatesType) {
    try {
      const response = await axios.put(`api/tickets`, {
        ...newData,
      });
      const { ticket_id, name, email, status, reply } = response.data;
      console.log(
        `Ticket #${ticket_id} updated. Latest response: ${reply} and updated status: ${
          status === 'new'
            ? 'New'
            : status === 'resolved'
            ? 'Resolved'
            : 'In Progress'
        } sent to ${name} (${email}).`
      );
      getTickets();
      showHiddenRow(ticket_id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error((error as AxiosError).response);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <>
      <tr
        onClick={() => showHiddenRow(ticket_id)}
        className="[&:nth-child(4n+1)]:bg-white [&:nth-child(4n+3)]:bg-light-gray"
      >
        <td
          className={`${
            last && activeHiddenId !== ticket_id ? 'rounded-bl-[20px]' : ''
          } px-6 py-2 text-[small]`}
        >
          {ticket_id}
        </td>
        <td className="px-5 py-2 text-[small]">
          {new Date(updated_at ? updated_at : created_at).toDateString()}
        </td>
        <td className="px-5 py-2 text-[small]">{name}</td>
        <td className="px-5 py-2 text-[small]">{email}</td>
        <td className="px-5 py-2 text-[small]">{summary}</td>
        <td className="px-5 py-2 text-[small]">
          {status === 'new'
            ? 'New'
            : status === 'resolved'
            ? 'Resolved'
            : 'In Progress'}
        </td>
        <td
          className={`px-6 py-2 ${
            last && activeHiddenId !== ticket_id ? 'rounded-br-[20px]' : ''
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#000000"
            viewBox="0 0 256 256"
            className={`${activeHiddenId === ticket_id && 'rotate-180'}`}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </td>
      </tr>
      <tr
        id={`hidden-row-${ticket_id}`}
        className="hidden [&:nth-child(4n+2)]:bg-white [&:nth-child(4n+4)]:bg-light-gray"
      >
        <td
          colSpan={3}
          className={`px-5 py-2 align-top ${last && 'rounded-bl-[20px]'}`}
        >
          <div>
            <h3 className="block text-dark-gray text-[small] font-medium mb-2 border-b-[1px] border-dark-gray">
              Issue Description
            </h3>
            <p className="text-[small] mb-2">{description}</p>
            <h3 className="block text-dark-gray text-[small] font-medium mb-2 border-b-[1px] border-dark-gray">
              Latest Response
            </h3>
            <p className="text-[small]">{reply ? reply : 'n/a'}</p>
          </div>
        </td>
        <td colSpan={2} className="px-5 py-2 align-top">
          <label
            htmlFor="reply"
            className="block text-dark-gray text-[small] font-medium mb-2"
          >
            Add Response
          </label>
          <textarea
            name="reply"
            id="reply"
            // cols="30"
            // rows="10"
            onChange={handleReplyChange}
            value={updatedReply}
            className="bg-white border border-light-gray text-gray text-[small] rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5 h-100"
          ></textarea>
        </td>
        <td className="px-5 py-2 align-top">
          <label
            htmlFor="status"
            className="block text-dark-gray text-[small] font-medium mb-2"
          >
            Update Status
          </label>
          <select
            name={status}
            id="status"
            value={updatedStatus}
            onChange={handleStatusChange}
            className="bg-white border border-light-gray text-gray text-[small] rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5"
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </td>
        <td
          className={`${
            last && activeHiddenId === ticket_id && 'rounded-br-[20px]'
          } px-2 py-10 align-top`}
        >
          <button
            onClick={handleUpdateTicket}
            className="bg-blue text-[small] text-white text-center rounded-[100px] min-w-[60px] px-[10px] py-[5px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-sky-blue"
          >
            Save
          </button>
        </td>
      </tr>
    </>
  );
}
