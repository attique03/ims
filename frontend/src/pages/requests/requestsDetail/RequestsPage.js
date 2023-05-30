import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../components/card/CardContainer';
// import CardContainer from '../../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import { Avatar, Button, Divider, Grid, Typography } from '@mui/material';
// import {
//   listComplaintDetails,
//   updateComplaint,
// } from '../../../../redux/actions/complaint/complaintActions';
// import { PENDING, RESOLVED } from '../../../../utils/constants';
// import { COMPLAINT_UPDATE_RESET } from '../../../../redux/constants/complaint/complaintConstants';
import './requests.css';
import {
  listComplaintDetails,
  updateComplaint,
} from '../../../redux/actions/complaint/complaintActions';
import { COMPLAINT_UPDATE_RESET } from '../../../redux/constants/complaint/complaintConstants';
import { ADMIN, PENDING, REJECTED, RESOLVED } from '../../../utils/constants';
import {
  listRequestsDetails,
  updateRequests,
} from '../../../redux/actions/requests/requestsActions';
import moment from 'moment';
import Error from '../../../components/error/Error';
import { REQUESTS_UPDATE_RESET } from '../../../redux/constants/requests/requestsConstants';

const RequestsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const requestsDetails = useSelector((state) => state.requestsDetails);
  const { requests, error } = requestsDetails;

  const requestsUpdate = useSelector((state) => state.requestsUpdate);
  const { error: errorRequestsUpdate, success } = requestsUpdate;

  useEffect(() => {
    dispatch(listRequestsDetails(params.id));
    // if (success) {
    //   dispatch({ type: REQUESTS_UPDATE_RESET });
    // }
  }, [dispatch, params, success]);

  const handleGoBack = () => {
    navigate('/requests');
  };

  const handleRejectRequest = () => {
    dispatch(updateRequests(params.id, REJECTED));
  };

  const handleResolveRequest = () => {
    console.log('Resolve');
    dispatch(updateRequests(params.id, RESOLVED));
  };

  return (
    <CardContainer>
      {errorRequestsUpdate && (
        <Error title="Error Updating" error={errorRequestsUpdate} />
      )}
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
                Request ID: {requests?.id}
              </Typography>
            </Typography>
            <Typography variant="span" component="span">
              {requests?.status === RESOLVED && (
                <div className="resolved-status">{RESOLVED}</div>
              )}
              {requests?.status === PENDING && (
                <div className="pending-status">{PENDING}</div>
              )}
              {requests?.status === REJECTED && (
                <div className="rejected-status">{REJECTED}</div>
              )}
            </Typography>
            <Typography
              variant="b"
              component="b"
              classes={{ root: 'submission-date' }}
            >
              Submission Date: {moment(requests?.createdDate).format('L')}
            </Typography>
          </Stack>
        </Box>
        {userInfo?.user?.role?.role === ADMIN &&
          requests?.status === PENDING && (
            <>
              <Box className={'mark-box'}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  classes={{ root: 'button-color-red' }}
                  onClick={handleRejectRequest}
                >
                  Reject Request
                </Button>
              </Box>

              <Box className={'mark-box'}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  classes={{ root: 'button-color' }}
                  onClick={handleResolveRequest}
                >
                  Approve Request
                </Button>
              </Box>
            </>
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
            <Typography>{requests?.description}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Item Name
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{requests?.itemName}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Category
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{requests?.subCategory?.parent?.name}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ py: 1, my: 3 }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Category
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{requests?.subCategory?.name}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container sx={{ mt: 3 }}>
          <Typography variant="h6" component="h6">
            <Typography variant="b" component="b">
              Request Submitted By
            </Typography>
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={1.2}>
            <Avatar
              src={`/uploads/${requests?.user?.image?.split('/')[3]}`}
              className={'profile-image'}
              alt="profile-image"
            />
          </Grid>
          <Grid item xs={10.8}>
            <Typography variant="h5" component="h5">
              <Typography variant="b" component="b">
                {requests?.user?.name}
              </Typography>
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {requests?.user?.email}
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {requests?.user?.phone}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* ______________________ Content Ends ______________________ */}
    </CardContainer>
  );
};

export default RequestsPage;
