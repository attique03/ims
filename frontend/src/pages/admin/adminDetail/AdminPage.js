import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { getUserDetails } from '../../../redux/actions/user/userActions';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuActions from '../../../components/menu/Menu';
import './admin.css';

const AdminPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(null);
  const open = Boolean(showMenu);

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails(params.id));
  }, [dispatch, params]);

  const handleGoBack = () => {
    navigate('/admins');
  };

  const handleMenuOpen = (event) => {
    setShowMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setShowMenu(null);
  };

  return (
    <CardContainer>
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
                Admin Detail
              </Typography>
            </Typography>
          </Stack>
        </Box>
        <Box className={'header-right'}>
          <IconButton
            aria-label="menu"
            onClick={handleMenuOpen}
            classes={{ root: 'icon-background' }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
          <MenuActions
            id="menu-actions"
            anchorEl={showMenu}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <EditOutlinedIcon classes={{ root: 'edit-color' }} />
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
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
              <Typography variant="b" component="b">
                {user?.name}
              </Typography>
            </Typography>
            <Typography classes={{ root: 'back' }}>{user?.email}</Typography>
            <Typography classes={{ root: 'back' }}>{user?.phone}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 8 }}>
          <Typography variant="h6" component="h6">
            <Typography variant="b" component="b">
              Organization
            </Typography>
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
              <Typography variant="b" component="b">
                {user?.organization?.name}
              </Typography>
            </Typography>
            <Typography classes={{ root: 'back' }}>
              {user && user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} classes={{ root: 'box-spacing' }}>
          <Grid item xs={3}>
            <Typography>
              <Typography variant="b" component="b">
                Representative Name
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.representativeName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} classes={{ root: 'box-spacing' }}>
          <Grid item xs={3}>
            <Typography>
              <Typography variant="b" component="b">
                Representative Contact
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.representativeContact}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} classes={{ root: 'box-spacing' }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Bio
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{user?.organization?.bio}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} classes={{ root: 'box-spacing' }}>
          <Grid item xs={3}>
            <Typography variant="b" component="b">
              Address
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

export default AdminPage;
