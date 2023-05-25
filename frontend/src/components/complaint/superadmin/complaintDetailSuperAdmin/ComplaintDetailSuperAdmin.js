import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import { Avatar, Button, Divider, Grid, Typography } from '@mui/material';
import {
  listComplaintDetails,
  updateComplaint,
} from '../../../../redux/actions/complaint/complaintActions';
import { PENDING, RESOLVED } from '../../../../utils/constants';
import './complaintDetailSuperAdmin.css';
import { COMPLAINT_UPDATE_RESET } from '../../../../redux/constants/complaint/complaintConstants';

const ComplaintDetailSuperAdmin = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const complaintDetails = useSelector((state) => state.complaintDetails);
  const { complaint, error } = complaintDetails;

  const complaintUpdate = useSelector((state) => state.complaintUpdate);
  const { error: errorComplaintUpdate, success } = complaintUpdate;

  useEffect(() => {
    dispatch(listComplaintDetails(params.id));
    if (success) {
      dispatch({ type: COMPLAINT_UPDATE_RESET });
    }
  }, [dispatch, params, success]);

  const handleGoBack = () => {
    navigate('/complaints');
  };

  const handleStatusChange = () => {
    dispatch(updateComplaint(params.id));
  };

  return (
    <CardContainer>
      {/* ______________________ Header Starts ______________________ */}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography classes={{ root: 'back' }} onClick={handleGoBack}>
              <ArrowBackIcon classes={{ root: 'back-icon' }} />
              Back
            </Typography>
            <Typography variant="h5" component="h5">
              <Typography variant="b" component="b">
                Complaint ID: {complaint?.id}
              </Typography>
            </Typography>
            <Typography variant="span" component="span">
              {complaint?.status === RESOLVED && (
                <div className="resolved-status">{RESOLVED}</div>
              )}
              {complaint?.status === PENDING && (
                <div className="pending-status">{PENDING}</div>
              )}
            </Typography>
          </Stack>
        </Box>
        {complaint?.status === PENDING && (
          <Box className={'mark-box'}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              classes={{ root: 'button-color' }}
              onClick={handleStatusChange}
            >
              Mark as Resolved
            </Button>
          </Box>
        )}
      </Box>
      {/* ______________________ Header Ends ______________________ */}

      {/* ______________________ Content Starts ______________________ */}
      <Box sx={{ mx: 2, mt: 2, mb: 4 }}>
        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Description
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{complaint?.description}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <Typography sx={{ mb: 1 }}>Attachments</Typography>
            <Avatar
              src={`/uploads/${complaint?.image?.split('/')[3]}`}
              className={'attachments'}
              alt="attachments"
            />
          </Grid>
        </Grid>

        <Divider />

        <Grid container sx={{ mt: 3 }}>
          <Typography variant="h6" component="h6">
            <Typography variant="b" component="b">
              Complaint Submitted By
            </Typography>
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={1.2}>
            <Avatar
              src={`/uploads/${complaint?.user?.image?.split('/')[3]}`}
              className={'profile-image'}
              alt="profile-image"
            />
          </Grid>
          <Grid item xs={10.8}>
            <Typography variant="h5" component="h5">
              <Typography variant="b" component="b">
                {complaint?.user?.name}
              </Typography>
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {complaint?.user?.email}
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {complaint?.user?.phone}
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 5 }}>
          <Typography variant="h6" component="h6">
            <Typography variant="b" component="b">
              Organization
            </Typography>
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={1.2}>
            <Avatar
              src={`/uploads/${complaint?.organization?.image?.split('/')[3]}`}
              className={'profile-image'}
              alt="organization-logo"
            />
          </Grid>
          <Grid item xs={10.8}>
            <Typography variant="h5" component="h5">
              <Typography variant="b" component="b">
                {complaint?.organization?.name}
              </Typography>
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {complaint?.organization?.email}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* ______________________ Content Ends ______________________ */}
    </CardContainer>
  );
};

export default ComplaintDetailSuperAdmin;
