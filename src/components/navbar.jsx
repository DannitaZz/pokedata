import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../img/pokeball.png'
import LogoutIcon from '@mui/icons-material/Logout';
import BasicMenu from './filterbar';
import SearchAppBar from './searchbar';
import { useNavigate, useLocation } from "react-router-dom";

const pages = ['Pokémon', 'Favorites'];
const settings = ['Logout'];

const ResponsiveAppBar = ({ searchValue, currentType, dispatch }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigateTo = useNavigate();
  let location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateToRepo = (e) => {

    if (e.target.value === '0') {
      navigateTo('/');
    }
    else if (e.target.value === '1') {
      navigateTo('/favorites');
    }
    setAnchorElNav(null);
  };

  const navigateToRepo_ = (e) => {
    const { value } = e.target.innerText;
    if (e.target.innerText === 'Pokémon') {
      navigateTo('/');
    }
    else if (e.target.innerText === 'Favorites') {
      navigateTo('/favorites');
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    navigateTo('/');
    setAnchorElUser(null);
  };

  const handleCloseUserMenuLogout = () => {
    dispatch({type:'logout'})
    navigateTo('/login');
    setAnchorElUser(null);
  };


  return (
    <AppBar position="sticky" style={{ background: '#161B22' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt='logo' style={{ maxWidth: 50 }} onClick={() => navigateTo('/')} />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                value={i}
                onClick={navigateToRepo}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {(() => {
            if (location.pathname === '/' || location.pathname === '/favorites') {
              return (
                <>
                  <Box sx={{ flexGrow: 0, display: 'flex' }}>
                    <BasicMenu currentType={currentType} dispatch={dispatch} />
                  </Box>
                  <Box sx={{ flexGrow: 0, display: 'flex' }}>
                    <SearchAppBar searchValue={searchValue} dispatch={dispatch} />
                  </Box>
                </>
              )
            }
          })()}
          {/* <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <BasicMenu currentType={currentType} dispatch={dispatch} />
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <SearchAppBar searchValue={searchValue} dispatch={dispatch} />
          </Box> */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', lg: 'flex' } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white', marginLeft: '10px' }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenuLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;