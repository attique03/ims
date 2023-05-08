import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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

export const inventoryData = [
  ['Inventory', 'Assigned Items', 'Remaining Items'],
  ['Electronics', 1000, 400],
  ['Furniture', 460, 250],
  ['Stationary', 660, 300],
];

export const complaintsData = [
  ['Complaints', 'Pending', 'Resolved'],
  ['Jan', 1000, 400],
  ['Feb', 460, 250],
  ['Mar', 660, 300],
  ['Apr', 460, 500],
  ['May', 349, 456],
  ['Jun', 660, 300],
];

// export const options = {
//   chart: {
//     title: 'Company Performance',
//     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
//   },
// };

export function DashboardGraph() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <TabContext value={value}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography>January</Typography>
            </Box>
          </TabContext>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={inventoryData}
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
          <TabContext value={value}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              January
            </Box>
          </TabContext>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={complaintsData}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
