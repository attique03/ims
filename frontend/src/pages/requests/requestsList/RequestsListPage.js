import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../components/table/Table';
import CardContainer from '../../../components/card/CardContainer';
import { listAssets } from '../../../redux/actions/asset/assetActions';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import { adminColumns, employeeColumns } from './requestsListData';
import { listRequests } from '../../../redux/actions/requests/requestsActions';
import {
  ADMIN,
  EMPLOYEE,
  PENDING,
  REJECTED,
  RESOLVED,
} from '../../../utils/constants';
import Error from '../../../components/error/Error';

const RequestsListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [status, setStatus] = useState('');
  const [filteredOnStatus, setFilteredOnStatus] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error: errorRequestsList } = requestsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listRequests());
  }, [dispatch]);

  const handleAdd = () => {
    navigate('create');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setStatus('');
    setFilteredOnStatus('');
    setSearchValue(e.target.value);

    let search = e.target.value;
    const filtered = requests.filter((request) =>
      request.requests_itemName.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredInventory(filtered);
  };

  const handleChangeStatus = (e) => {
    e.preventDefault();
    setSearchValue('');
    setFilteredInventory('');
    setStatus(e.target.value);

    let search = e.target.value;
    const filtered = requests.filter((request) =>
      request.requests_status.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnStatus(filtered);
  };

  return (
    <CardContainer>
      {errorRequestsList && <Error error={errorRequestsList} />}
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography variant="h5" component="h5">
              Requests
            </Typography>
            {userInfo?.user?.role?.role === ADMIN && (
              <>
                <TextField
                  label="Search"
                  id="search"
                  size="small"
                  sx={{ width: '200px' }}
                  value={searchValue}
                  onChange={handleSearch}
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
                    <MenuItem value={REJECTED}>{REJECTED}</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Stack>
        </Box>
        {userInfo?.user?.role?.role === EMPLOYEE && (
          <Box p={1}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
              }
              sx={{ backgroundColor: '#31DE79' }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable
          columns={
            userInfo?.user?.role?.role === ADMIN
              ? adminColumns
              : employeeColumns
          }
          data={
            filteredInventory.length > 0
              ? filteredInventory
              : filteredOnStatus.length > 0
              ? filteredOnStatus
              : requests && requests
          }
        />
      </Box>
    </CardContainer>
  );
};

export default RequestsListPage;
