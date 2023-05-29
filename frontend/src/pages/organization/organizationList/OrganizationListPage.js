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
import { tableColumns, tableRows } from './organizationListData';
import CardContainer from '../../../components/card/CardContainer';
import { listOrganizations } from '../../../redux/actions/organization/organizationActions';
import Error from '../../../components/error/Error';

const OrganizationListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredOnSearch, setFilteredOnSearch] = useState([]);
  const [location, setLocation] = useState('');
  const [filteredOnLocation, setFilteredOnLocation] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const organizationList = useSelector((state) => state.organizationList);
  const { organizations, error } = organizationList;
  let locations = [];

  useEffect(() => {
    dispatch(listOrganizations());
  }, [dispatch]);

  if (organizations) {
    organizations.map((org) => locations.push(org.location));
  }

  const handleAdd = () => {
    navigate('/organizations/create');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredOnLocation('');
    setLocation('');
    setSearchValue(e.target.value);

    let search = e.target.value;
    const filtered = organizations.filter((oragnization) =>
      oragnization.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnSearch(filtered);
  };

  const handleChangeLocation = (e) => {
    e.preventDefault();
    setSearchValue('');
    setFilteredOnSearch('');
    setLocation(e.target.value);

    let search = e.target.value;
    const filtered = organizations.filter((oragnization) =>
      oragnization.location.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnLocation(filtered);
  };

  return (
    <CardContainer>
      {error && <Error title={'Error Fetching Organization'} error={error} />}
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Organizations
            </Typography>
            <TextField
              label="Search"
              id="value"
              value={searchValue}
              size="small"
              onChange={handleSearch}
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
              <InputLabel id="demo-select-small">Location</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={location}
                label="Location"
                onChange={handleChangeLocation}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {locations.length > 0 &&
                  locations?.map((loc, index) => (
                    <MenuItem key={index} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                {/* <MenuItem value="lahore">Lahore</MenuItem>
                <MenuItem value="london">London</MenuItem>
                <MenuItem value="berlin">Berlin</MenuItem> */}
              </Select>
            </FormControl>
          </Stack>
        </Box>
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
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable
          columns={tableColumns}
          data={
            filteredOnSearch.length > 0
              ? filteredOnSearch
              : filteredOnLocation.length > 0
              ? filteredOnLocation
              : organizations && organizations
          }
        />
      </Box>
    </CardContainer>
  );
};

export default OrganizationListPage;
