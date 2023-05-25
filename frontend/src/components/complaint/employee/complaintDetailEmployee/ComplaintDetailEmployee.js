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
import Error from '../../../error/Error';

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
      {error && <Error error={error} />}
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
            <Typography variant="b" component="b">
              Title
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{complaint?.title}</Typography>
          </Grid>
        </Grid>
        <Divider />

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
      </Box>
      {/* ______________________ Content Ends ______________________ */}
    </CardContainer>
  );
};

export default ComplaintDetailEmployee;
