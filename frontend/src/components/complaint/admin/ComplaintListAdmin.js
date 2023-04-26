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
import { listOrganizations } from '../../../redux/actions/organization/organizationActions';
import { listUsers } from '../../../redux/actions/user/userActions';
import { employeeColumns } from './ComplaintListDataAdmin';

const ComplaintListAdmin = () => {
  const [status, setStatus] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, error: error } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAdd = () => {
    navigate('/admins/create');
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
                onChange={handleChange}
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
        <DataTable columns={employeeColumns} data={users && users} />
      </Box>
    </CardContainer>
  );
};

export default ComplaintListAdmin;
