import { CreatedTicket, ErrorMessage, Ticket } from '../utils/Types';

export const createTicket = async (props: {
  categoryId: number | null;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  assigneeIds: number[];
}) => {
  const requestBody = {
    category_id: props.categoryId,
    subject: props.subject,
    description: props.description,
    status: props.status,
    priority: props.priority,
    assignee_ids: props.assigneeIds,
  };

  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error: ErrorMessage = await response.json();
    throw error.message;
  }

  const reponseBody: CreatedTicket = await response.json();
  return reponseBody.id;
};

export const retrieveTicketById = async (
  ticketId: number,
  queryParam?: string[][]
): Promise<Ticket> => {
  const response = await fetch(
    `/api/tickets/${ticketId}` + new URLSearchParams(queryParam),
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw `Failed to retrieve tickets for ticket id ${ticketId}`;
  }

  return await response.json();
};

export const retrieveTickets = async (props?: {
  reporter?: number;
  open?: boolean;
}) => {
  const url = new URL(`/api/tickets`, window.location.href);

  if (props != undefined) {
    if (props.reporter != undefined) {
      url.searchParams.append('reporter', String(props.reporter));
    }

    if (props.open != undefined) {
      url.searchParams.append('open', String(props.open));
    }
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw 'Failed to retrieve tickets';
  }

  const data: Ticket[] = await response.json();

  return data;
};

export const updateTicket = async (
  ticketId: number,
  props?: {
    categoryId?: number | null;
    subject?: string;
    description?: string;
    status?: string;
    priority?: string;
    assigneeIds?: number[];
  }
) => {
  const requestBody = {
    category_id: props?.categoryId,
    subject: props?.subject,
    description: props?.description,
    status: props?.status,
    priority: props?.priority,
    assignee_ids: props?.assigneeIds,
  };

  const response = await fetch(`/api/tickets/${ticketId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw `Failed to update ticket #${ticketId}`;
  }
};
