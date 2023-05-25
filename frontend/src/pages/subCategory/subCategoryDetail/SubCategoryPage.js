import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSubCategoryDetails } from '../../../redux/actions/subcategory/subcategoryActions';
import CardContainer from '../../../components/card/CardContainer';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import MenuActions from '../../../components/menu/Menu';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const SubCategoryPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const subcategoryDetails = useSelector((state) => state.subcategoryDetails);
  const { subcategory, error } = subcategoryDetails;

  useEffect(() => {
    dispatch(listSubCategoryDetails(params.subCatId));
  }, [dispatch, params]);

  const handleGoBack = () => {
    navigate('/categories');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log('listSubCategoryDetails', params);

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
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Category Name</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{subcategory?.categoryname}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Sub-Category Name</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{subcategory?.subcategoryname}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Total Quantity</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{subcategory?.totalquantity}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <b>Quantity Assigned</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{subcategory?.quantityassigned}</Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Quantity Unassigned</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{subcategory?.quantityunassigned}</Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <b>Quantity Faulty</b>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{subcategory?.quantityfaulty}</Typography>
          </Grid>
        </Grid>
        <Divider />

        <Grid container sx={{ mt: 8 }}>
          <Typography variant="h6" component="h6">
            <b>Vendors</b>
          </Typography>
        </Grid>

        {subcategory?.vendornames?.map((vendor) => (
          <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
            <Grid item xs={3}>
              <Typography>
                <b>Name</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{vendor?.split('(')[0]}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                <b>Contact Number</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{vendor?.split('(')[1].split(')')[0]}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </CardContainer>
  );
};

export default SubCategoryPage;
