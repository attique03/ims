import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faArrowDownZA,
  faArrowUpAZ,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { employeeColumns, adminColumns } from './ComplaintListDataAdmin';
import SwipeableViews from 'react-swipeable-views';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
import './complaintListAdmin.css';

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

const ComplaintListAdmin = () => {
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState(true);
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error: errorcomplaintList } = complaintList;

  const userList = useSelector((state) => state.userList);
  const { users, error: error } = userList;

  useEffect(() => {
    dispatch(listComplaints(true));
  }, [dispatch]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClick = () => {
    setFilter(!filter);
  };

  const handleComplaintCreate = () => {
    console.log('reate');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(listComplaints(true));
    } else if (newValue === 1) {
      dispatch(listComplaints());
    }
  };
  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Compalints
            </Typography>
            <TextField
              label="Search"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '200px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ height: '13px' }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">Select Status</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={status}
                label="Select Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="nisum">Nisum</MenuItem>
                <MenuItem value="techswipe">Techswipe</MenuItem>
                <MenuItem value="gigalabs">GigaLabs</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box p={1}>
          <IconButton
            aria-label="Example"
            onClick={handleClick}
            classes={{ root: 'icon-background' }}
          >
            {filter ? (
              <FontAwesomeIcon icon={faArrowUpAZ} />
            ) : (
              <FontAwesomeIcon icon={faArrowDownZA} />
            )}
          </IconButton>
        </Box>
        {value === 1 && (
          <Box p={1}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
              }
              sx={{ backgroundColor: '#31DE79' }}
              onClick={handleComplaintCreate}
            >
              Create Complaint
            </Button>
          </Box>
        )}
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
            TabIndicatorProps={{
              sx: {
                display: 'none',
              },
            }}
          >
            <Tab
              label="Employees"
              {...a11yProps(0)}
              classes={{ root: value === 0 && 'customized-tab' }}
              selected={false}
            />
            <Tab
              label="Submitted"
              {...a11yProps(1)}
              classes={{ root: value === 1 && 'customized-tab' }}
              selected={false}
            />
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, borderLeft: '1px solid #E0E0E0' }}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChange}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <DataTable
                columns={employeeColumns}
                data={complaints && complaints}
              />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <DataTable
                columns={adminColumns}
                data={complaints && complaints}
              />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default ComplaintListAdmin;
