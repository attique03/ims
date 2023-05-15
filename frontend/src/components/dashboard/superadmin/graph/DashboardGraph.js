import React, { useState, useEffect } from 'react';
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

export const data = [
  ['Element', 'Density', { role: 'style' }],
  ['Jan', 200, '#318CE7'], // RGB value
  ['Feb', 500, '#318CE7'], // English color name
  ['Mar', 856, '#318CE7'],
  ['Apr', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['May', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Jun', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Jul', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Aug', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Sep', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Oct', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Nov', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Dec', 91.45, 'color: #318CE7'], // CSS-style declaration
];

export const data2 = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#318CE7'], // RGB value
  ['Silver', 10.49, '#318CE7'], // English color name
  ['Gold', 19.3, '#318CE7'],
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
];

export function DashboardGraph() {
  const [value, setValue] = useState('1');
  // const [adminStats, setAdminStats] = useState([]);

  const dispatch = useDispatch();

  const dashboardStats = useSelector((state) => state.dashboardStats);
  const { dashboardStats: dashboard, error } = dashboardStats;

  let adminStats = [];
  let organizationStats = [];

  useEffect(() => {
    dispatch(listDashboardStats());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Box sx={{ display: 'flex' }}>
        <Box flexGrow={1} sx={{ display: 'flex' }}>
          <Typography
            component="span"
            variant="span"
            sx={{ marginTop: '11px', padding: '0px 15px' }}
          >
            Analytics
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
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              // style={{
              //   "& .css-1aquho2-MuiTabs-indicator": {
              //     height: "0px",
              //   },
              // }}
            >
              <Tab label="Organizations" value="1" />
              <Tab label="Admins" value="2" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <TabPanel value="1">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={organizationStats}
            />
          </TabPanel>
          <TabPanel value="2">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={adminStats}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
