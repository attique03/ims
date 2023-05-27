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
import { tableColumns } from './employeeListData';
import CardContainer from '../../../components/card/CardContainer';
import { listOrganizations } from '../../../redux/actions/organization/organizationActions';
import { listUsers } from '../../../redux/actions/user/userActions';
import Error from '../../../components/error/Error';
import { listDepartments } from '../../../redux/actions/department/departmentActions';

const EmployeeListPage = () => {
  const [department, setDepartment] = React.useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, error } = userList;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments, error: errorDepartments } = departmentList;

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listDepartments());
  }, [dispatch]);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleAdd = () => {
    navigate('create');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorDepartments && (
        <Error
          title={'Error Organizations Fetching'}
          error={errorDepartments}
        />
      )}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Employees
            </Typography>
            <TextField
              label="Search"
              id="search"
              size="small"
              classes={{ root: 'icon-box' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faSearch} className="icon-size" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl classes={{ root: 'icon-box' }} size="small">
              <InputLabel id="department">Department</InputLabel>
              <Select
                labelId="department"
                id="department"
                value={department}
                label="Department"
                onChange={handleChange}
              >
                {departments?.map((dept) => (
                  <MenuItem value={dept.name}>{dept.name}</MenuItem>
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
            Add Employee
          </Button>
        </Box>
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable columns={tableColumns} data={users && users} />
      </Box>
    </CardContainer>
  );
};

export default EmployeeListPage;
