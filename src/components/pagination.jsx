import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({actionName, page, count, dispatch}) {
  const handleChange = (event, value) => {
    dispatch({type: actionName, page: value});
  };

  return (
      <div style={{width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1%', marginBottom: '1%'}}>
    <Stack spacing={2} sx={{alignSelf: 'center'}}>
        <Pagination count={count}  color="primary" page={page}  onChange={handleChange} />
    </Stack>
    </div>
  );
}