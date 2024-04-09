import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function TicketItem({
  ticket,
  activeHiddenId,
  setActiveHiddenId,
  getTickets,
}) {
  const [updatedStatus, setUpdatedStatus] = useState(ticket.status);
  const [updatedReply, setUpdatedReply] = useState(
    ticket.reply ? ticket.reply : ''
  );

  function showHiddenRow(ticketId) {
    const hiddenRow = document.getElementById(`hidden-row-${ticketId}`);
    if (activeHiddenId !== null && activeHiddenId !== ticketId) {
      const activeHiddenRow = document.getElementById(
        `hidden-row-${activeHiddenId}`
      );
      activeHiddenRow.classList.add('hidden');
    }
    hiddenRow.classList.toggle('hidden');
    if (!hiddenRow.classList.contains('hidden')) {
      setActiveHiddenId(ticketId);
    } else {
      setActiveHiddenId(null);
    }
  }

  function handleStatusChange(event) {
    setUpdatedStatus(event.target.value);
  }

  function handleReplyChange(event) {
    setUpdatedReply(event.target.value);
  }

  const {
    ticket_id,
    created_at,
    updated_at,
    name,
    summary,
    description,
    status,
    reply,
  } = ticket;

  function handleUpdateTicket() {
    const ticketUpdates = {
      ticket_id,
      status: updatedStatus,
      reply: updatedReply,
    };
    console.log(
      'inside handleupdateticket and ticketUpdates are: ',
      ticketUpdates
    );
    updateTicket(ticketUpdates);
  }

  async function updateTicket(newData) {
    try {
      console.log('inside axios put request');
      await axios.put(`api/tickets`, {
        ...newData,
      });
      getTickets();
      showHiddenRow(ticket_id)
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
      <tr onClick={() => showHiddenRow(ticket_id)}>
        <td>{ticket_id}</td>
        <td>{new Date(updated_at ? updated_at : created_at).toDateString()}</td>
        <td>{name}</td>
        <td>{summary}</td>
        <td>{status}</td>
        <td>{activeHiddenId === ticket_id ? 'uparrow' : 'downarrow'}</td>
      </tr>
      <tr id={`hidden-row-${ticket_id}`} className="hidden">
        <td colSpan="2">{description}</td>
        <td colSpan="2">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={handleReplyChange}
            value={updatedReply}
          ></textarea>
        </td>
        <td>
          <select
            name={status}
            id=""
            value={updatedStatus}
            onChange={handleStatusChange}
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </td>
        <td>
          <button onClick={handleUpdateTicket}>Save Updates</button>
        </td>
      </tr>
    </>
  );
}
