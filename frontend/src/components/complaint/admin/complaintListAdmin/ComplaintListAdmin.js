import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
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
import {
  faAdd,
  faArrowDownZA,
  faArrowUpAZ,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { employeeColumns, adminColumns } from './ComplaintListDataAdmin';
import TabPanel from '../../../tab/tabPanel/TabPanel';
import Error from '../../../error/Error';
import './complaintListAdmin.css';
import { PENDING, RESOLVED } from '../../../../utils/constants';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ComplaintListAdmin = () => {
  const [filter, setFilter] = useState(true);
  const [value, setValue] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [filteredOnSearch, setFilteredOnSearch] = useState([]);
  const [status, setStatus] = useState('');
  const [filteredOnStatus, setFilteredOnStatus] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  useEffect(() => {
    dispatch(listComplaints(true));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredOnStatus('');
    setSearchValue(e.target.value);

    let search = e.target.value;
    const filtered = complaints.filter((complaint) =>
      complaint.complaint_description
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
    setFilteredOnSearch(filtered);
  };

  const handleChangeStatus = (event) => {
    event.preventDefault();
    setFilteredOnSearch('');
    setStatus(event.target.value);

    let search = event.target.value;
    const filtered = complaints.filter((complaint) =>
      complaint.complaint_status.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnStatus(filtered);
  };

  const handleSort = () => {
    setFilter(!filter);
  };

  const handleComplaintCreate = () => {
    navigate('create');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchValue('');
    setFilteredOnSearch('');
    setStatus('');
    setFilteredOnStatus('');
    if (newValue === 0) {
      dispatch(listComplaints(true));
    } else if (newValue === 1) {
      dispatch(listComplaints());
    }
  };
  return (
    <CardContainer>
      {error && <Error error={error} />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              <Typography variant="b" component="b">
                Complaints
              </Typography>
            </Typography>
            <TextField
              label="Search"
              size="small"
              value={searchValue}
              classes={{ root: 'icon-box' }}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faSearch} className="icon-size" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl classes={{ root: 'icon-box' }} size="small">
              <InputLabel id="status">Select Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={status}
                label="Select Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={PENDING}>{PENDING}</MenuItem>
                <MenuItem value={RESOLVED}>{RESOLVED}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box className={'header-right'}>
          <IconButton
            aria-label="filter"
            onClick={handleSort}
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
          <Box className={'header-right'}>
            <Button
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faAdd} className="icon-size" />}
              classes={{ root: 'create-button' }}
              onClick={handleComplaintCreate}
            >
              Create Complaint
            </Button>
          </Box>
        )}
      </Box>

      <Box className={'content'}>
        <Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Tabs"
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
              classes={{ root: value === 0 && 'tab' }}
              selected={false}
            />
            <Tab
              label="Submitted"
              {...a11yProps(1)}
              classes={{ root: value === 1 && 'tab' }}
              selected={false}
            />
          </Tabs>
        </Box>
        <Box className={'tab-content'}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChange}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <DataTable
                columns={employeeColumns}
                data={
                  filteredOnSearch.length > 0
                    ? filteredOnSearch
                    : filteredOnStatus.length > 0
                    ? filteredOnStatus
                    : complaints && complaints
                }
              />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <DataTable
                columns={adminColumns}
                data={
                  filteredOnSearch.length > 0
                    ? filteredOnSearch
                    : filteredOnStatus.length > 0
                    ? filteredOnStatus
                    : complaints && complaints
                }
              />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default ComplaintListAdmin;
