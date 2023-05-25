import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { listDashboardData } from '../../../../redux/actions/dashboard/dashboardActions';
import './DashboardSummary.css';
import Error from '../../../error/Error';

export default function DashboardSummary() {
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboardData);
  const { dashboardData: dashboard, error } = dashboardData;

  useEffect(() => {
    dispatch(listDashboardData());
  }, [dispatch]);

  return (
    <Box>
      {error && <Error error={error} />}
      <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
        <Grid item md={0.5} xs={0}></Grid>
        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Employees</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalEmployees}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newEmployeesCount} new Employee added this month
          </Typography>
        </Grid>

        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Inventory Items</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalAssets}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newAssetsCount} new items added this month
          </Typography>
        </Grid>

        <Grid item md={3} xs={12} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Vendors</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalVendors}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newVendorsCount} New Vendors added this month
          </Typography>
        </Grid>

        <Grid item md={2.5} xs={12}>
          <Typography classes={{ root: 'item' }}>Categories</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalCategories}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'item-caption' }}>
            {dashboard?.newCategoriesCount} New Category added this month
          </Typography>
        </Grid>

        <Grid item md={1} xs={0}></Grid>
      </Grid>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
}
