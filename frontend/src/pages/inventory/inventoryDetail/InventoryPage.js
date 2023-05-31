import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuActions from '../../../components/menu/Menu';
import {
  deleteAsset,
  listAssetDetails,
} from '../../../redux/actions/asset/assetActions';
import Error from '../../../components/error/Error';
import Loader from '../../../components/loader/Loader';
import { ASSET_DELETE_RESET } from '../../../redux/constants/asset/assetConstants';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const assetDetails = useSelector((state) => state.assetDetails);
  const { asset, error } = assetDetails;

  const assetDelete = useSelector((state) => state.assetDelete);
  const { success, error: errorAssetDelete } = assetDelete;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    // dispatch(getUserDetails(params.id));
    dispatch(listAssetDetails(params.id));

    if (success) {
      dispatch({ type: ASSET_DELETE_RESET });
      navigate('/inventory');
    }
  }, [dispatch, params, success, navigate]);

  const handleGoBack = () => {
    navigate('/inventory');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorAssetDelete && (
        <Error title={'Error Deleting Asset'} error={errorAssetDelete} />
      )}

      {loadingState && <Loader />}
      <Box className={'header'}>
        <Box className={'header-left'}>
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
              <b>Inventory Detail</b>
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
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('edit')} disableRipple>
              <div className="edit-color">
                <EditOutlinedIcon classes={{ root: 'edit-color' }} />
              </div>
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => dispatch(deleteAsset(params.id))}
              disableRipple
            >
              <DeleteOutlineOutlinedIcon classes={{ root: 'delete-color' }} />
              Delete
            </MenuItem>
          </MenuActions>
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography>
              <b>Item Name</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{asset?.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <b>Serial Number</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{asset?.serial_number}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Description</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{asset?.description}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Category</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{asset?.subCategory?.parent?.name}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Sub-Category</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{asset?.subCategory?.name}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Date of Purchase</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{moment(asset?.createdDate).format('L')}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Unit Price</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>Rs {asset?.price}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Current Price</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>Rs {asset?.price}</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container sx={{ mt: 8 }}>
          <Typography variant="h6" component="h6">
            <b>Vendor</b>
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Name</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{asset?.vendor?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Contact Number</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{asset?.vendor?.phone}</Typography>
          </Grid>
        </Grid>

        {asset?.employee && (
          <>
            <Grid container sx={{ mt: 8 }}>
              <Typography variant="h6" component="h6">
                <b>Assigned to</b>
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item md={1.2} xs={4}>
                <Avatar
                  src={`/uploads/${asset?.employee?.image?.split('/')[3]}`}
                  className={'profile-image'}
                  alt="organization-logo"
                />
              </Grid>
              <Grid item md={10.8} xs={8}>
                <Typography variant="h5" component="h5">
                  <b>{asset?.employee?.email}</b>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {asset?.employee?.phone}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </CardContainer>
  );
};

export default InventoryPage;
