import { AvatarGroup, Box, Grid, Paper, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../components/ProfilePicture';
import { retrieveTickets } from '../services/TicketService';
import { getLocalTime } from '../utils/TimeUtils';
import { Ticket } from '../utils/Types';
import { getDisplayName } from '../utils/UserUtils';

const columns: GridColDef[] = [
  {
    field: 'subject',
    headerName: 'Subject',
    flex: 2,
    renderCell: (params: GridValueGetterParams<string, Ticket>) => (
      <Link to={`/tickets/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    field: 'category_id',
    headerName: 'Category',
    flex: 1,
    valueGetter: (params: GridValueGetterParams<string, Ticket>) =>
      params.row.category ? params.row.category.name : 'N/A',
  },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'reporter_id',
    headerName: 'Reported By',
    flex: 1,
    renderCell: (params: GridValueGetterParams<string, Ticket>) => (
      <>
        <ProfilePicture user={params.row.reporter} />
        <Box component={'span'} style={{ marginLeft: 10 }}>
          {getDisplayName(params.row.reporter)}
        </Box>
      </>
    ),
  },
  {
    field: 'assignees',
    headerName: 'Assignees',
    flex: 1,
    renderCell: (params: GridValueGetterParams<string, Ticket>) => (
      <AvatarGroup>
        {params.row.assignees.map((assignee) => (
          <ProfilePicture key={assignee.id} user={assignee} />
        ))}
      </AvatarGroup>
    ),
  },
  {
    field: 'created',
    headerName: 'Created',
    flex: 1,
    valueGetter: (params: GridValueGetterParams<string, Ticket>) =>
      getLocalTime(params.row.created),
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveTicketsForTable = async () => {
      const tickets = await retrieveTickets();
      setTickets(tickets);
      setLoading(false);
    };

    retrieveTicketsForTable();
  }, []);

  return (
    <Grid>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 740,
        }}
      >
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          List of tickets
        </Typography>
        <div style={{ flexGrow: 1, flexDirection: 'row' }}>
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            rows={tickets}
            columns={columns}
            loading={loading}
            initialState={{
              sorting: {
                sortModel: [{ field: 'created', sort: 'desc' }],
              },
            }}
            disableSelectionOnClick
          />
        </div>
      </Paper>
    </Grid>
  );
}
