import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import DashboardSummary from '../../components/dashboard/DashboardSummary';
import { DashboardGraph } from '../../components/dashboard/DashboardGraph';
import DataTable from '../../components/table/Table';
import CardContainer from '../../components/card/CardContainer';
import { useSelector } from 'react-redux';
import { ADMIN, EMPLOYEE, SUPERADMIN } from '../../utils/constants';
import DashboardSuperAdmin from '../../components/dashboard/superadmin/DashboardSuperAdmin';
import DashboardAdmin from '../../components/dashboard/admin/DashboardAdmin';
import DashboardEmployee from '../../components/dashboard/employee/DashboardEmployee';

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

const DashboardPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  return (
    <div>
      {userInfo?.user.role.role === SUPERADMIN ? (
        <DashboardSuperAdmin />
      ) : userInfo?.user.role.role === ADMIN ? (
        <DashboardAdmin />
      ) : userInfo?.user.role.role === EMPLOYEE ? (
        <DashboardEmployee />
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default DashboardPage;
