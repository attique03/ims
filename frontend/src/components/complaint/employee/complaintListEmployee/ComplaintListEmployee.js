import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { listOrganizations } from '../../../../redux/actions/organization/organizationActions';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
import { tableColumns } from './ComplaintListDataEmployee';
import { useNavigate } from 'react-router-dom';

const ComplaintListEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error: errorcomplaintList } = complaintList;

  useEffect(() => {
    dispatch(listComplaints());
  }, [dispatch]);

  const handleComplaintCreate = () => {
    navigate('create');
  };

  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Complaints
            </Typography>
          </Stack>
        </Box>
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
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable columns={tableColumns} data={complaints && complaints} />
      </Box>
    </CardContainer>
  );
};

export default ComplaintListEmployee;
