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
import { tableColumns } from './returnsListData';
import { listRequests } from '../../../redux/actions/requests/requestsActions';
import { ADMIN, EMPLOYEE, PENDING, RESOLVED } from '../../../utils/constants';

const ReturnsListPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredOnSearch, setFilteredOnSearch] = useState([]);
  const [status, setStatus] = useState('');
  const [filteredOnStatus, setFilteredOnStatus] = useState([]);
  const [type, setType] = useState('');
  const [filteredOnType, setFilteredOnType] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error: errorRequestsList } = requestsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listRequests('faulty'));
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
    setFilteredOnSearch(filtered);
  };

  const handleChangeStatus = (e) => {
    e.preventDefault();
    setSearchValue('');
    setFilteredOnSearch('');
    setStatus(e.target.value);

    let search = e.target.value;
    const filtered = requests.filter((request) =>
      request.requests_status.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnStatus(filtered);
  };

  // const handleChangeType = (e) => {
  //   e.preventDefault();
  //   setSearchValue('');
  //   setFilteredOnSearch('');
  //   setType(e.target.value);

  //   let search = e.target.value;
  //   const filtered = requests.filter((request) =>
  //     request.requests_returnType.toLowerCase().includes(search.toLowerCase()),
  //   );
  //   setFilteredOnStatus(filtered);
  // };

  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography variant="h5" component="h5">
              Returns
            </Typography>
            {userInfo?.user?.role?.role === ADMIN && (
              <>
                <TextField
                  label="Search"
                  id="search"
                  value={searchValue}
                  size="small"
                  sx={{ width: '200px' }}
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
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={PENDING}>{PENDING}</MenuItem>
                    <MenuItem value={RESOLVED}>{RESOLVED}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl classes={{ root: 'icon-box' }} size="small">
                  <InputLabel id="type">Select Type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    value={status}
                    label="Select Type"
                    // onChange={handleChangeType}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="repair">Repair</MenuItem>
                    <MenuItem value="replace">Replace</MenuItem>
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
          columns={tableColumns}
          data={requests && requests}
          //   data={
          //     filteredOnSearch.length > 0 ? filteredOnSearch : assets && assets
          //   }
        />
      </Box>
    </CardContainer>
  );
};

export default ReturnsListPage;
