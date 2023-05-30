import { useDispatch, useSelector } from 'react-redux';
import DashboardSummary from './summary/DashboardSummary';
import { DashboardGraph } from './graph/DashboardGraph';
import DataTable from '../../table/Table';
import { Box, Typography } from '@mui/material';
import CardContainer from '../../card/CardContainer';
import Error from '../../error/Error';
import { tableColumns } from '../../complaint/superadmin/complaintListSuperAdmin/ComplaintListDataSuperAdmin';
import { useEffect } from 'react';
import { listComplaints } from '../../../redux/actions/complaint/complaintActions';
import { Link } from 'react-router-dom';

const DashboardSuperAdmin = () => {
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  const complaintsLength = complaints?.length === 0;

  useEffect(() => {
    dispatch(listComplaints());
  }, [dispatch, complaintsLength]);

  return (
    <CardContainer>
      <Typography variant="h5" component="h5" sx={{ m: 1, p: 1 }}>
        Dashboard
      </Typography>
      <DashboardSummary />
      <DashboardGraph />
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Typography variant="h5" component="h5">
            Recent Complaints
          </Typography>
        </Box>
        <Box className={'header-right'}>
          <Link to={'/complaints'} className={'nav-link'}>
            See All
          </Link>
        </Box>
      </Box>
      {error && <Error error={error} />}
      <DataTable
        columns={tableColumns}
        data={complaints && complaints}
        viewType="complaints"
        // rows={2}
      />
    </CardContainer>
  );
};

export default DashboardSuperAdmin;
