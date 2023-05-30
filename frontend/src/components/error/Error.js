import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const Error = ({ title, error, severity }) => {
  return (
    <Alert severity={severity ? severity : 'error'}>
      <AlertTitle>{title ? title : 'Error'}</AlertTitle>
      {error}
    </Alert>
  );
};

export default Error;
