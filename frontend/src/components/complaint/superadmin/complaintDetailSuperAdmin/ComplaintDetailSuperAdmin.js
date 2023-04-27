import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { getUserDetails } from '../../../../redux/actions/user/userActions';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuActions from '../../../../components/menu/Menu';
import './complaintDetailSuperAdmin.css';

const ComplaintDetailSuperAdmin = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails(params.id));
  }, [dispatch, params]);

  const handleGoBack = () => {
    navigate('/admins');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardContainer>
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
              sx={{}}
              onClick={handleGoBack}
            >
              <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
              Back
            </Typography>
            <Typography variant="h5" component="h5">
              <b>Admin Detail</b>
            </Typography>
          </Stack>
        </Box>
        <Box p={1}>
          <IconButton
            aria-label="Example"
            onClick={handleMenuOpen}
            classes={{ root: 'icon-background' }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
          <MenuActions
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} disableRipple>
              <div className="edit-color">
                <EditOutlinedIcon classes={{ root: 'edit-color' }} />
              </div>
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose} disableRipple>
              <DeleteOutlineOutlinedIcon classes={{ root: 'delete-color' }} />
              Delete
            </MenuItem>
          </MenuActions>
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.2}>
            <Avatar
              src={`/uploads/${user?.image?.split('/')[3]}`}
              className={'profile-image'}
              alt="profile-image"
            />
          </Grid>
          <Grid item xs={10.8}>
            <Typography variant="h5" component="h5">
              <b>{user?.name}</b>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {user?.email}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {user?.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 8 }}>
          <Typography variant="h6" component="h6">
            <b>Organization</b>
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={1.2}>
            <Avatar
              src={`/uploads/${user?.organization?.image?.split('/')[3]}`}
              className={'profile-image'}
              alt="organization-logo"
            />
          </Grid>
          <Grid item xs={10.8}>
            <Typography variant="h5" component="h5">
              <b>{user?.organization?.name}</b>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {user && user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Representative Name</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.representativeName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Representative Contact</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.representativeContact}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Bio</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.bio}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Address</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.address}</Typography>
          </Grid>
        </Grid>
      </Box>
    </CardContainer>
  );
};

export default ComplaintDetailSuperAdmin;
