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

  useEffect(() => {
    dispatch(listDashboardData());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={3} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Employees</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalEmployees}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'caption-color' }}>
            {dashboard?.newEmployeesCount} new Employee added this month
          </Typography>
        </Grid>

        <Grid item xs={3} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Inventory Items</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalAssets}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'caption-color' }}>
            {dashboard?.newAssetsCount} new items added this month
          </Typography>
        </Grid>

        <Grid item xs={3} classes={{ root: 'border-item' }}>
          <Typography classes={{ root: 'item' }}>Vendors</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalVendors}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'caption-color' }}>
            {dashboard?.newVendorsCount} New Vendors added this month
          </Typography>
        </Grid>

        <Grid item xs={2.5}>
          <Typography classes={{ root: 'item' }}>Categories</Typography>
          <Typography classes={{ root: 'item-content' }}>
            {dashboard?.totalCategories}{' '}
            <FontAwesomeIcon icon={faCaretUp} className={'icon-green'} />
          </Typography>
          <Typography classes={{ root: 'caption-color' }}>
            {dashboard?.newCategoriesCount} New Category added this month
          </Typography>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
}
