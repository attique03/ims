import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../../components/table/Table';
import CardContainer from '../../../../components/card/CardContainer';
import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
import { tableColumns } from './ComplaintListDataEmployee';
import { useNavigate } from 'react-router-dom';
import Error from '../../../error/Error';

const ComplaintListEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  useEffect(() => {
    dispatch(listComplaints());
  }, [dispatch]);

  const handleComplaintCreate = () => {
    navigate('create');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Complaints
            </Typography>
          </Stack>
        </Box>
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
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable columns={tableColumns} data={complaints && complaints} />
      </Box>
    </CardContainer>
  );
};

export default ComplaintListEmployee;
