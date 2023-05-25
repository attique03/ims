import { useEffect, useState } from 'react';
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
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { listOrganizations } from '../../../../redux/actions/organization/organizationActions';
import { tableColumns } from './ComplaintListDataSuperAdmin';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
import { PENDING, RESOLVED } from '../../../../utils/constants';
import Error from '../../../error/Error';

const ComplaintListSuperAdmin = () => {
  const [organization, setOrganization] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  const organizationList = useSelector((state) => state.organizationList);
  const { organizations, error: errorOrganizationList } = organizationList;

  useEffect(() => {
    dispatch(listOrganizations());
    dispatch(listComplaints());
  }, [dispatch]);

  const handleChangeOrganization = (event) => {
    setOrganization(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorOrganizationList && (
        <Error
          title={'Error Fetching Organization'}
          error={errorOrganizationList}
        />
      )}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Complaints
            </Typography>
            <TextField
              label="Search"
              size="small"
              classes={{ root: 'icon-box' }}
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
              <InputLabel id="oragnization">Select Organization</InputLabel>
              <Select
                labelId="oragnization"
                id="oragnization"
                value={organization}
                label="Organization"
                onChange={handleChangeOrganization}
              >
                {organizations?.map((organization) => (
                  <MenuItem key={organization.id} value={organization.id}>
                    {organization.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
