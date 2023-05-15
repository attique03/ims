import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Box from '@mui/material/Box';
import { Grid, IconButton, Menu, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDownload } from '@fortawesome/free-solid-svg-icons';
import { listDashboardStats } from '../../../../redux/actions/dashboard/dashboardActions';
import MenuItem from '@mui/material/MenuItem';
import { months } from './DashboardGraphMonths';

// export const options = {
//   chart: {
//     title: 'Company Performance',
//     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
//   },
// };

export function DashboardGraph() {
  const [month, setMonth] = useState('May');
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();

  const dashboardStats = useSelector((state) => state.dashboardStats);
  const { dashboardStats: dashboard, error } = dashboardStats;

  let inventoryStats = [];
  let complaintsStats = [];

  useEffect(() => {
    dispatch(listDashboardStats());
  }, [dispatch, month]);

  const handleOpenMonthMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMonthMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    setMonth(event);
    handleCloseMonthMenu();
  };

  if (dashboard) {
    // Inventorty Stats
    inventoryStats.push(['Inventory', 'Assigned Items', 'Remaining Items']);
    dashboard?.assetCountsByCategoryAndMonth?.map((dash) => {
      if (dash.month.split(' ')[0] === month) {
        inventoryStats.push([
          dash.category,
          Number(dash.assignedcount),
          Number(dash.unassignedcount),
        ]);
      }
      return inventoryStats;
    });

    // Complaints Stats
    complaintsStats.push(['Complaints', 'Pending', 'Resolved']);
    dashboard?.complaintsCountPerMonth?.map((dash) =>
      complaintsStats.push([
        dash.month.split(' ')[0],
        Number(dash.pendingcount),
        Number(dash.resolvedcount),
      ]),
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={5} sx={{ p: 1, m: 1 }}>
        <Box
          sx={{
            width: '100%',
            typography: 'body1',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ display: 'flex' }} flexGrow={1}>
            <Typography
              component="span"
              variant="span"
              sx={{ marginTop: '5px', padding: '0px 15px' }}
            >
              Inventory Items
            </Typography>
            <Typography
              component="span"
              variant="span"
              sx={{ my: '5px', color: '#A9A9A9' }}
            >
              <FontAwesomeIcon
                icon={faDownload}
                style={{ paddingRight: '8px' }}
              />
              Download Report
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Tooltip title="Monthly Stats">
              <IconButton sx={{ p: 0 }} onClick={handleOpenMonthMenu}>
                <Typography sx={{ mx: 1, color: 'black' }}>{month}</Typography>
                <FontAwesomeIcon icon={faChevronDown} className="fa-light" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseMonthMenu}
            >
              {months.map((mnth) => (
                <MenuItem
                  onClick={() => handleChange(mnth.month)}
                  key={mnth.id}
                >
                  <Typography textAlign="center">{mnth.month}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={inventoryStats}
            // options={options}
          />
        </Box>
      </Grid>

      <Grid item xs={6} sx={{ p: 1, m: 1 }}>
        <Box
          sx={{
            width: '100%',
            typography: 'body1',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography
              component="span"
              variant="span"
              sx={{ marginTop: '11px', padding: '0px 15px' }}
            >
              Inventory Items
            </Typography>
            <Typography
              component="span"
              variant="span"
              sx={{ marginTop: '11px', color: '#A9A9A9' }}
            >
              <FontAwesomeIcon
                icon={faDownload}
                style={{ paddingRight: '8px' }}
              />
              Download Report
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={complaintsStats}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
