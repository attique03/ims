import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { listDashboardData } from '../../../../redux/actions/dashboard/dashboardActions';
import './DashboardSummary.css';

export default function DashboardSummary() {
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboardData);
  const { dashboardData: dashboard, error } = dashboardData;

  const dashboardLength = dashboard?.length === 0;

  useEffect(() => {
    dispatch(listDashboardData());
  }, [dispatch, dashboardLength]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
        <Grid item md={0.5} xs={0}></Grid>
        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Organizations</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalOrganizations}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newOrganizationsCount} new Organizations this month
          </Typography>
        </Grid>

        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Admins</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalAdmins}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newAdminsCount} Active Admins this month
          </Typography>
        </Grid>

        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Pending Complaints</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.pendingComplaints}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.pendingComplaintsCount} Complaints pending this month
          </Typography>
        </Grid>

        <Grid item md={2.5} xs={12}>
          <Typography classes={{ root: 'item' }}>
            Resolved Complaints
          </Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.resolvedComplaints}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.resolvedComplaintsCount} Complaints resolved this month
          </Typography>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
}
