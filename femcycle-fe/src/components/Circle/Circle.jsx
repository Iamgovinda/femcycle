import React from 'react';
import { Box } from '@mui/material';

const Circle = (props) => {
  return (
    <Box height={props.height} width={props.width} backgroundColor={props.bg} sx={{ borderRadius:'50%'}}>
    </Box>
  )
}

export default Circle