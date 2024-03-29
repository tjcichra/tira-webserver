import {
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import TiraDrawer from './TiraDrawer';
import TiraAppBar from './TiraAppBar';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Category, User } from './utils/Types';
import LoginModal from './LoginModal';
import ErrorSnackbar from './components/ErrorSnackbar';

export const drawerWidth = 240;

function Copyright({ sx }: { sx: { pt: number } }) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' sx={sx}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Timmy Joe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Base({
  user,
  categories,
  setCategories,
  loggedIn,
  setLoggedIn,
}: {
  user?: User;
  categories?: Category[];
  setCategories: (category: Category[]) => void;
  loggedIn: boolean;
  setLoggedIn: (newLoggedIn: boolean) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TiraAppBar
          user={user}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setLoginModalOpen={setLoginModalOpen}
        />
        <TiraDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          categories={categories}
          setCategories={setCategories}
        />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <LoginModal
        setLoggedIn={setLoggedIn}
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
      <ErrorSnackbar />
    </>
  );
}
