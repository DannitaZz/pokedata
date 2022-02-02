import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

export default function FixedBottomNavigation() {
    const navigateTo = useNavigate();
  return (
    <Box sx={{ pb: 7, flexGrow: 1, display: { xs: 'flex', lg: 'none' }}} /* ref={ref} */>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          onChange={(event, newValue) => {
              if (newValue === '0'){
                navigateTo('/');
              } else if (newValue === '1') {
                  navigateTo('/favorites');
              } else if (newValue === '2') {
                  /* navigateTo('/login') */
                  console.log(newValue);
              }
          }}
        >
          <BottomNavigationAction label="Pokémon" value='0' icon={<CatchingPokemonIcon />} />
          <BottomNavigationAction label="Favorites" value='1' icon={<StarIcon />} />
          <BottomNavigationAction label="Logout" value='2' icon={<ExitToAppIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

