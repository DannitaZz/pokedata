import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({state, dispatch}) {
  const handleChange = (event, value) => {
    dispatch({type: 'setPage', page: value});
  };

  return (
      <div style={{width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Stack spacing={2} sx={{alignSelf: 'center'}}>
      {/* <Typography>Page: {state && state.page}</Typography> */}
      <Pagination count={45}  color="primary" page={state && state.page}  onChange={handleChange} />
    </Stack>
    </div>
  );
}