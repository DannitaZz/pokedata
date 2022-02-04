import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FixedBottomNavigation({dispatch}) {
    const navigateTo = useNavigate();
    let location = useLocation();
    /* console.log('Location', location) */
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
                dispatch({type:'logout'})
                navigateTo('/login')
              }
          }}
        >
          {(()=>{
            if (location.pathname === '/') {
              return ( 
              <BottomNavigationAction sx={{color: '#FF1C1C'}} label="Pokémon" value='0' icon={<CatchingPokemonIcon />} />
              ) 
            } else {
              return (<BottomNavigationAction label="Pokémon" value='0' icon={<CatchingPokemonIcon />} />)
            }
          })()}
          {(()=>{
            if (location.pathname === '/favorites') {
              return ( 
                <BottomNavigationAction sx={{color: '#FF1C1C'}} label="Favorites" value='1' icon={<StarIcon />} />  
              )
            } else {
              return (<BottomNavigationAction label="Favorites" value='1' icon={<StarIcon />} />  )
            }
          })()} 
                <BottomNavigationAction label="Logout" value='2' icon={<ExitToAppIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

