import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Button, Card, Container, Divider, Stack } from '@mui/material';
import CustomizedTables from '../../components/table/table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const tableColumns = ['ID', 'Image', 'Name', 'Email', 'Contact No.', 'Action'];
const tableRows = [
  {
    id: '19023867',
    image: '/logo.png',
    name: 'Alpha',

    email: 'info@alpha.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',

    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',

    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',

    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',

    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function OrganizationPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container style={{ maxWidth: '1200px', mb: 3 }}>
      <Card sx={{ borderRadius: '15px', boxShadow: 3, my: 5 }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Stack direction="row" spacing={2}>
              <Typography
                component="caption"
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'stretch',
                  color: '#808080',
                }}
              >
                <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                Back
              </Typography>
            </Stack>
          </Box>

          <Box p={1}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#31DE79' }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ justifyContent: 'flex-start' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              align="left"
              // sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="General Information" {...a11yProps(0)} />
              <Tab label="Admins" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 1 }} style={{ padding: '0px' }}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box sx={{ borderLeft: '1px solid #E0E0E0', p: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <img
                        src="/wp.png"
                        style={{ width: '100px', height: '100px' }}
                        alt="organization-logo"
                      />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h5" component="h5">
                        TechSwipe Pvt. Ltd.
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        ugreen@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }} p={1}>
                      <Typography>Bio</Typography>
                    </Box>
                    <Box p={1}>
                      <Typography sx={{ flexWrap: 'wrap' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam eget laoreet felis, at commodo dolor. Duis porta
                        urna id tellus hendrerit, vel dignissim nisi dapibus.
                        Vivamus porttitor eget augue quis ultricies. Integer
                        consequat aliquet lacus, at feugiat augue dignissim sit
                        amet. Suspendisse vel varius orci. Fusce ac sollicitudin
                        augue. Fusce est mi, dapibus eget pellentesque vel,
                        accumsan sed massa. Nunc vel vestibulum erat, quis
                        dignissim nibh. Aenean eu nisl eu sapien ullamcorper
                        rutrum. Sed vulputate magna at vestibulum maximus.
                        Maecenas euismod, quam vitae interdum ultrices, lacus
                        metus posuere quam, eu efficitur ante massa nec turpis.
                        In eget sem orci. Nullam at sodales ante, sit amet
                        viverra dui. Interdum et malesuada fames ac ante ipsum
                        primis in faucibus. Nulla facilisi. Nullam porttitor,
                        leo non suscipit blandit, tortor velit rhoncus nisl, sit
                        amet tincidunt risus ipsum vel ipsum.
                      </Typography>
                    </Box>
                  </Box>
                  <Divider/>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }} p={1}>
                      <Typography>Address</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0.5 }} p={1}>
                      <Typography sx={{ flexWrap: 'wrap' }}>
                        2177 Hide A Way Road, Lahore, Pakistan 56388
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }} p={1}>
                      <Typography>Representative Name</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 2 }} p={1}>
                      <Typography sx={{ flexWrap: 'wrap' }}>
                        John Doe
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      p: 1,
                      m: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }} p={1}>
                      <Typography>Representative Contact No.</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 2.2 }} p={1}>
                      <Typography sx={{ flexWrap: 'wrap' }}>
                        +92 321 0000000
                      </Typography>
                    </Box>
                  </Box>

                  {/* <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src="https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png"
                    style={{ width: '70px', height: '70px' }}
                    alt="organization-logo"
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      p: 1,
                      ml: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      height: '30px',
                    }}
                  >
                    <Typography>Organization Logo</Typography>
                    <Typography>Upload File</Typography>
                  </Box>
                </Box> */}
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <CustomizedTables columns={tableColumns} data={tableRows} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
