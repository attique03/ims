import React from 'react';
import { Card } from '@mui/material';
import { Container } from '@mui/system';
import './cardContainer.css';

const CardContainer = ({ children, minWid }) => {
  return (
    <Container classes={{ root: 'container-box' }}>
      <Card classes={{ root: 'card-box' }} sx={{ minWidth: minWid && minWid }}>
        {children}
      </Card>
    </Container>
  );
};

export default CardContainer;
