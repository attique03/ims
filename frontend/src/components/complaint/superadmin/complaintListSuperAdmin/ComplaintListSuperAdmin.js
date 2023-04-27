import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
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
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { listOrganizations } from '../../../../redux/actions/organization/organizationActions';
import { tableColumns } from './ComplaintListDataSuperAdmin';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';

const ComplaintListSuperAdmin = () => {
  const [organization, setOrganization] = useState('');
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error: errorcomplaintList } = complaintList;

  const organizationList = useSelector((state) => state.organizationList);
  const { organizations, error: errorOrganizationList } = organizationList;

  useEffect(() => {
    dispatch(listOrganizations());
    dispatch(listComplaints());
  }, [dispatch]);

  const handleChange = (event) => {
    setOrganization(event.target.value);
  };

  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Complaints
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
              <InputLabel id="demo-select-small">
                Select Organization
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={organization}
                label="Organization"
                onChange={handleChange}
              >
                {organizations?.map((organization) => (
                  <MenuItem key={organization.id} value={organization.id}>
                    {organization.name}
                  </MenuItem>
                ))}
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="nisum">Nisum</MenuItem>
                <MenuItem value="techswipe">Techswipe</MenuItem>
                <MenuItem value="gigalabs">GigaLabs</MenuItem> */}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">Select Status</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={organization}
                label="Organization"
                onChange={handleChange}
              >
                {organizations?.map((organization) => (
                  <MenuItem key={organization.id} value={organization.id}>
                    {organization.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable columns={tableColumns} data={complaints && complaints} />
      </Box>
    </CardContainer>
  );
};

export default ComplaintListSuperAdmin;
