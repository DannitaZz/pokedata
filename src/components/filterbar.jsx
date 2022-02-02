import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function BasicMenu({ currentType, dispatch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleActionClose = (e) => {
    // console.log(e.target.getAttribute("value")) 
    dispatch({ type: "filterType", value: e.target.getAttribute("value") })
    return handleClose(e)
  }
  function upperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterListIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {types.map((type, i) => {
          if (type === currentType) {
            return (
              <MenuItem key={`M${i}`} value={type} onClick={handleActionClose}>
                <CheckBoxIcon /> {  upperFirstLetter(type)}
              </MenuItem>
            )
          } else {
            return (
              <MenuItem key={`M${i}`} value={type} onClick={handleActionClose}>
                <CheckBoxOutlineBlankIcon /> {  upperFirstLetter(type)}
              </MenuItem>)
          }
        })}
      </Menu>
    </div>
  );
}