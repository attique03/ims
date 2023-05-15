import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { DashboardGraph } from './graph/DashboardGraph';
import DashboardSummary from './summary/DashboardSummary';
import DataTable from '../../table/Table';
import { Typography } from '@mui/material';
import CardContainer from '../../card/CardContainer';
// import DataTable from '../../components/table/Table';

const tableColumns = [
  'ID',
  'Admin Name',
  'Organization',
  'Description',
  'Submission Date',
  'Status',
  'Action',
];
const tableRows = [
  {
    id: '19023867',
    adminName: 'John Doe',
    organization: 'Alpha',
    description: 'Lorem Ipsum',
    submissionDate: '11/12/12',
    status: 'Pending',
    // action: '',
  },
  {
    id: '203928409',
    adminName: 'Jane Doe',
    organization: 'Beta',
    description: 'Lorem Ipsum',
    submissionDate: '11/12/12',
    status: 'Completed',
    // action: '',
  },
];

const DashboardAdmin = () => {
  return (
    <CardContainer>
      <Typography variant="h5" component="h5" sx={{ m: 1, p: 1 }}>
        Dashboard
      </Typography>
      <DashboardSummary />
      <DashboardGraph />
      <DataTable columns={tableColumns} data={tableRows} />
    </CardContainer>
  );
};

export default DashboardAdmin;
