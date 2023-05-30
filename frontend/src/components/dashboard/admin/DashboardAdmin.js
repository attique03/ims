import { useDispatch, useSelector } from 'react-redux';
import { DashboardGraph } from './graph/DashboardGraph';
import DashboardSummary from './summary/DashboardSummary';
import DataTable from '../../table/Table';
import { Box, Typography } from '@mui/material';
import CardContainer from '../../card/CardContainer';
import { employeeColumns } from '../../complaint/admin/complaintListAdmin/ComplaintListDataAdmin';
import { useEffect } from 'react';
import { listComplaints } from '../../../redux/actions/complaint/complaintActions';
import Error from '../../error/Error';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  useEffect(() => {
    dispatch(listComplaints(true));
  }, [dispatch]);

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
        columns={employeeColumns}
        data={complaints && complaints}
        viewType="complaints"
      />
    </CardContainer>
  );
};

export default DashboardAdmin;
