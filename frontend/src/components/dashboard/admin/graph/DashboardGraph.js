import { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Box from '@mui/material/Box';
import { Grid, IconButton, Menu, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDownload } from '@fortawesome/free-solid-svg-icons';
import { listDashboardStats } from '../../../../redux/actions/dashboard/dashboardActions';
import MenuItem from '@mui/material/MenuItem';
import Error from '../../../error/Error';
import { bar, columnChart, months } from './data/dashboardGraphData';
import './dashboardGraph.css';

export function DashboardGraph() {
  const [month, setMonth] = useState('May');
  const [showMonths, setShowMonths] = useState(null);

  const dispatch = useDispatch();

  const dashboardStats = useSelector((state) => state.dashboardStats);
  const { dashboardStats: dashboard, error } = dashboardStats;

  let inventoryStats = [];
  let complaintsStats = [];

  useEffect(() => {
    dispatch(listDashboardStats());
  }, [dispatch, month]);

  const handleOpenMonthMenu = (event) => {
    setShowMonths(event.currentTarget);
  };

  const handleCloseMonthMenu = () => {
    setShowMonths(null);
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
    <>
      {error && <Error title={'Graph Chart Error '} error={error} />}
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ p: 1, m: 1 }}>
          <Box className={'graph-header'}>
            <Box className={'header-left'}>
              <Typography component="span" variant="span" sx={{ pr: 2 }}>
                Inventory Items
              </Typography>
              <Typography variant="span" classes={{ root: 'download' }}>
                <FontAwesomeIcon icon={faDownload} className={'icon'} />
                <CSVLink data={inventoryStats} className={'download'}>
                  Download Report
                </CSVLink>
              </Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Tooltip title="Monthly Stats">
                <IconButton sx={{ p: 0 }} onClick={handleOpenMonthMenu}>
                  <Typography classes={{ root: 'month' }}>{month}</Typography>
                  <FontAwesomeIcon icon={faChevronDown} className="fa-light" />
                </IconButton>
              </Tooltip>
              <Menu
                id="month-menu"
                anchorEl={showMonths}
                open={Boolean(showMonths)}
                onClose={handleCloseMonthMenu}
              >
                {months.map((mo) => (
                  <MenuItem onClick={() => handleChange(mo.month)} key={mo.id}>
                    <Typography textAlign="center">{mo.month}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <Box>
            <Chart chartType={bar} className={'chart'} data={inventoryStats} />
          </Box>
        </Grid>

        <Grid item xs={6} sx={{ mt: 2 }}>
          <Box sx={{ ml: 10 }}>
            <Box>
              <Typography component="span" variant="span" sx={{ pr: 2 }}>
                Inventory Items
              </Typography>
              <Typography
                component="span"
                variant="span"
                classes={{ root: 'download' }}
              >
                <FontAwesomeIcon icon={faDownload} className={'icon'} />
                <CSVLink data={complaintsStats} className={'download'}>
                  Download Report
                </CSVLink>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chart
              chartType={columnChart}
              className={'chart'}
              data={complaintsStats}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
