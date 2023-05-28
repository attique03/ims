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
import { tableColumns, tableRows } from './adminListData';
import CardContainer from '../../../components/card/CardContainer';
import { listOrganizations } from '../../../redux/actions/organization/organizationActions';
import { listUsers } from '../../../redux/actions/user/userActions';
import './adminList.css';
import Error from '../../../components/error/Error';

const AdminListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredOnSearch, setFilteredOnSearch] = useState([]);
  const [organization, setOrganization] = useState('');
  const [filteredOnOrganization, setFilteredOnOrganization] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, error } = userList;

  const organizationList = useSelector((state) => state.organizationList);
  const { organizations, error: errorOrganizations } = organizationList;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listOrganizations());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredOnOrganization('');
    setSearchValue(e.target.value);

    let search = e.target.value;
    const filtered = users.filter((user) =>
      user.user_name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnSearch(filtered);
  };

  const handleChangeOrganization = (event) => {
    event.preventDefault();
    setFilteredOnSearch('');
    setOrganization(event.target.value);

    let search = event.target.value;
    const filtered = users.filter((user) =>
      user.organization.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredOnOrganization(filtered);
  };

  const handleAdd = () => {
    navigate('/admins/create');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorOrganizations && (
        <Error
          title={'Error Organizations Fetching'}
          error={errorOrganizations}
        />
      )}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Admins
            </Typography>
            <TextField
              label="Search"
              id="search"
              size="small"
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
              <InputLabel id="organization">Organization</InputLabel>
              <Select
                labelId="organization"
                id="organization"
                value={organization}
                label="Organization"
                onChange={handleChangeOrganization}
              >
                {organizations?.map((org) => (
                  <MenuItem value={org.name}>{org.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
        <Box p={1}>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} className="icon-size" />}
            classes={{ root: 'add-btn' }}
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
              : filteredOnOrganization.length > 0
              ? filteredOnOrganization
              : users && users
          }
        />
      </Box>
    </CardContainer>
  );
};

export default AdminListPage;
