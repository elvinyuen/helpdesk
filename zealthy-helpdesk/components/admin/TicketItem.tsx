import { useState } from 'react';

export default function TicketItem({
  ticket,
  activeHiddenId,
  setActiveHiddenId,
}) {
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
        <td colSpan="2">{reply}</td>
        <td>update status</td>
        <td>save update</td>
      </tr>
    </>
  );
}
