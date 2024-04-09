const db = require('./database/ticketModel');
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // deconstruct the query request body
  //   console.log('req is: ', req, 'res is: ', res);

  try {
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
  } catch (error) {
    return {
      log: `Error occurred in ticketController middleware, ${error}`,
      status: 500,
      message: {
        error: 'Unable to handle request to create a ticket.',
      },
    };
  }
}
