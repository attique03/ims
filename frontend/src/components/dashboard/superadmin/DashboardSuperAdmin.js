import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
// import DashboardSummary from '../../components/dashboard/DashboardSummary';
// import { DashboardGraph } from '../../components/dashboard/DashboardGraph';
// import DataTable from '../../components/table/Table';
import DashboardSummary from './summary/DashboardSummary';
import { DashboardGraph } from './graph/DashboardGraph';
import DataTable from '../../table/Table';
import { Typography } from '@mui/material';

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
    action: '',
  },
  {
    id: '203928409',
    adminName: 'Jane Doe',
    organization: 'Beta',
    description: 'Lorem Ipsum',
    submissionDate: '11/12/12',
    status: 'Completed',
    action: '',
  },
];

const DashboardSuperAdmin = () => {
  tableRows.map((row, index) => {
    console.log('Loop ', index);
    Object.values(row).map((value, index) => {
      console.log('Values ===> ', value);
    });
  });

  return (
    <Container
      style={{
        maxWidth: '1200px',
        marginBottom: '5rem',
        paddingBottom: '3rem',
      }}
    >
      <Card sx={{ borderRadius: '15px', boxShadow: 3, my: 5 }}>
        <Typography variant="h5" component="h5" sx={{ m: 1, p: 1 }}>
          Dashboard
        </Typography>
        <DashboardSummary />
        <DashboardGraph />
        <DataTable columns={tableColumns} data={tableRows} />
      </Card>
    </Container>
  );
};

export default DashboardSuperAdmin;
