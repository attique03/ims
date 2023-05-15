import { Card } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const CardContainer = ({ children, minWid }) => {
  return (
    <Container style={{ maxWidth: '1200px', mb: 3 }}>
      <Card
        sx={{
          borderRadius: '15px',
          boxShadow: 3,
          my: 5,
          p: 2,
          minWidth: minWid && minWid,
        }}
      >
        {children}
      </Card>
    </Container>
  );
};

export default CardContainer;
