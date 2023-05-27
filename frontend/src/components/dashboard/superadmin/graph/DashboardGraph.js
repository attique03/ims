import React, { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { listDashboardStats } from '../../../../redux/actions/dashboard/dashboardActions';
import { columnChart, tabs } from './data/dashboardGraphData';
import Error from '../../../error/Error';

export function DashboardGraph() {
  const [tabValue, setTabValue] = useState(1);

  const dispatch = useDispatch();

  const dashboardStats = useSelector((state) => state.dashboardStats);
  const { dashboardStats: dashboard, error } = dashboardStats;

  let adminStats = [];
  let organizationStats = [];
  const dashboardLength = dashboard?.length === 0;

  useEffect(() => {
    dispatch(listDashboardStats());
  }, [dispatch, dashboardLength]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (dashboard) {
    // Admin Stats
    adminStats.push(['Element', 'Admins', { role: 'style' }]);
    dashboard?.adminCountsPerMonth?.map((dash) =>
      adminStats.push([
        dash.month.split(' ')[0],
        Number(dash.count),
        '#318CE7',
      ]),
    );

    // Organization Stats
    organizationStats.push(['Element', 'Organizations', { role: 'style' }]);
    dashboard?.orgCountsPerMonth?.map((dash) =>
      organizationStats.push([
        dash.month.split(' ')[0],
        Number(dash.count),
        '#318CE7',
      ]),
    );
  }

  return (
    <>
      {error && <Error title={'Graph Chart Error '} error={error} />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Typography component="span" variant="span" sx={{ pr: 2 }}>
            Analytics
          </Typography>
          <Typography variant="span" classes={{ root: 'download' }}>
            <FontAwesomeIcon icon={faDownload} className={'icon'} />
            <CSVLink
              data={tabValue === 1 ? organizationStats : adminStats}
              className={'download'}
            >
              Download Report
            </CSVLink>
          </Typography>
        </Box>
        <TabContext value={tabValue}>
          <Box>
            <TabList onChange={handleChange} aria-label="tabs">
              {tabs.map((tab) => (
                <Tab key={tab.id} label={tab.name} value={tab.id} />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box>
        <TabContext value={tabValue}>
          <TabPanel value={1}>
            <Chart
              chartType={columnChart}
              className={'chart'}
              data={organizationStats}
            />
          </TabPanel>
          <TabPanel value={2}>
            <Chart
              chartType={columnChart}
              className={'chart'}
              data={adminStats}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
