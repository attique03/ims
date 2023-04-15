import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export const data = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#318CE7'], // RGB value
  ['Silver', 10.49, '#318CE7'], // English color name
  ['Gold', 19.3, '#318CE7'],
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 21.45, 'color: #318CE7'], // CSS-style declaration
  ['Platinum', 91.45, 'color: #318CE7'], // CSS-style declaration
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
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
              data={data}
            />
          </TabPanel>
          <TabPanel value="2">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={data2}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
