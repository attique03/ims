import { Typography } from '@mui/material';
import React from 'react';
import CardContainer from '../../card/CardContainer';

const DashboardEmployee = () => {
  return (
    <CardContainer>
      <Typography variant="h5" component="h5" sx={{ m: 1, p: 1 }}>
        Dashboard
      </Typography>
    </CardContainer>
  );
};

export default DashboardEmployee;
