import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../components/card/CardContainer';
import { Box, Stack } from '@mui/system';
import Chip from '@mui/material/Chip';
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
import { listAssetDetails } from '../../../redux/actions/asset/assetActions';
import {
  deleteVendor,
  getVendorDetails,
} from '../../../redux/actions/vendor/vendorActions';
import Error from '../../../components/error/Error';
import Loader from '../../../components/loader/Loader';
import './vendorPage.css';

const VendorPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const vendorDetails = useSelector((state) => state.vendorDetails);
  const { vendor, error } = vendorDetails;

  const vendorDelete = useSelector((state) => state.vendorDelete);
  const { success, error: errorVendorDelete } = vendorDelete;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  const assetDetails = useSelector((state) => state.assetDetails);
  const { asset } = assetDetails;

  useEffect(() => {
    dispatch(getVendorDetails(params.id));
    if (success) {
      navigate('/vendors');
    }
  }, [dispatch, params, success, navigate]);

  const handleGoBack = () => {
    navigate('/vendors');
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
      {errorVendorDelete && <Error error={errorVendorDelete} />}

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
              <b>Vendor Detail</b>
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
              onClick={() => dispatch(deleteVendor(params.id))}
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
              <b>Name</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{vendor?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Contact Number</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography>{vendor?.phone}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ py: 2, my: 2 }}>
          <Grid item md={3} xs={12}>
            <Typography>
              <b>Category</b>
            </Typography>
          </Grid>
          <Grid item md={9} xs={12}>
            {/* <Typography>{vendor?.subCategory[0]?.parent?.name}</Typography> */}
            <Typography>
              {vendor &&
                vendor?.subCategory?.length > 0 &&
                vendor?.subCategory[0]?.parent?.name}
            </Typography>
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
            <Stack direction="row" spacing={1}>
              {vendor &&
                vendor?.subCategory?.length > 0 &&
                vendor?.subCategory.map((subCat) => (
                  <Chip
                    label={subCat.name}
                    variant="outlined"
                    className="chip"
                  />
                ))}
              {/* <Chip label="Chip Filled" />
              <Chip label="Chip Outlined" variant="outlined" /> */}
            </Stack>
            {/* <Typography>{asset?.subCategory?.name}</Typography> */}
          </Grid>
        </Grid>
      </Box>
    </CardContainer>
  );
};

export default VendorPage;
