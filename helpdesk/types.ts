export interface TicketType {
  ticket_id: number;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  email: string;
  summary: string;
  description: string;
  status: string;
  reply: string;
}
