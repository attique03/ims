import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import { listComplaintDetails } from '../../../../redux/actions/complaint/complaintActions';
import { PENDING, RESOLVED } from '../../../../utils/constants';
import './complaintDetailEmployee.css';

const ComplaintDetailEmployee = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const complaintDetails = useSelector((state) => state.complaintDetails);
  const { complaint, error } = complaintDetails;

  useEffect(() => {
    dispatch(listComplaintDetails(params.id));
  }, [dispatch, params]);

  const handleGoBack = () => {
    navigate('/complaints');
  };

  return (
    <CardContainer>
      {/* ______________________ Header Starts ______________________ */}
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography
              classes={{ root: 'title' }}
              component="caption"
              variant="caption"
              onClick={handleGoBack}
            >
              <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
              Back
            </Typography>
            <Typography variant="h5" component="h5">
              <b>Complaint ID: {complaint?.id}</b>
            </Typography>
            <Typography variant="span" component="span">
              {complaint?.status === RESOLVED && (
                <div className="resolved-status">Resolved</div>
              )}
              {complaint?.status === PENDING && (
                <div className="pending-status">Pending</div>
              )}
            </Typography>
            <Typography
              variant="b"
              component="b"
              classes={{ root: 'submission-date' }}
            >
              Submission Date: {moment(complaint?.createdDate).format('L')}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Divider />
      {/* ______________________ Header Ends ______________________ */}

      {/* ______________________ Content Starts ______________________ */}
      <Box sx={{ mx: 2, mt: 2, mb: 4 }}>
        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Title</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{complaint?.title}</Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Description</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{complaint?.description}</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* ______________________ Content Ends ______________________ */}
    </CardContainer>
  );
};

export default ComplaintDetailEmployee;
