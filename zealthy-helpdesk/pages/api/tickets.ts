const db = require('./database/ticketModel');
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // deconstruct the query request body
  //   console.log('req is: ', req, 'res is: ', res);

  try {
    if (req.method === 'GET') {
      const getTicketsQuery = `SELECT * FROM tickets
      ORDER BY ticket_id ASC`;
      const response = await db.query(getTicketsQuery);
      const tickets = response.rows;
      return res.status(200).json(tickets);
    }
    if (req.method === 'POST') {
      console.log(req.body);
      const { name, email, description, summary } = req.body;
      const params = [name, email, description, summary];
      const saveTicketQuery = `
        INSERT INTO tickets (name, email, description, summary)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;
      const response = await db.query(saveTicketQuery, params);
      console.log(response);
      console.log('ticket successfully saved');
      return res.status(201).json(response.rows[0]);
    }
    if (req.method === 'PUT') {
      const { ticket_id, status, reply } = req.body;
      const params = [status, reply, ticket_id];

      const updateTicketQuery = `
        UPDATE tickets
        SET status = $1, reply = $2, updated_at = CURRENT_TIMESTAMP
        WHERE ticket_id = $3
        RETURNING *
        `;
      const response = await db.query(updateTicketQuery, params);
      console.log('ticket successfully updated');
      return res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    return {
      log: `Error occurred in ticketController middleware, ${error}`,
      status: 500,
      message: {
        error: 'Unable to handle request to tickets API.',
      },
    };
  }
}
