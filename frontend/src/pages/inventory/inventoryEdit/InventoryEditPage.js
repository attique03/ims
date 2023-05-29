import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React from 'react';
import CardContainer from '../../../components/card/CardContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { listVendors } from '../../../redux/actions/vendor/vendorActions';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import {
  ASSET_CREATE_RESET,
  ASSET_UPDATE_RESET,
} from '../../../redux/constants/asset/assetConstants';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createAsset,
  listAssetDetails,
  updateAsset,
} from '../../../redux/actions/asset/assetActions';
import Error from '../../../components/error/Error';

const InventoryEditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    serial_number: 0,
    description: '',
    // subCategory: '',
    price: 0,
    // vendor: '',
  });
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const theme = createTheme();

  theme.typography.h5 = {
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.3rem',
    },
  };

  const assetDetails = useSelector((state) => state.assetDetails);
  const { asset, error } = assetDetails;

  const assetUpdate = useSelector((state) => state.assetUpdate);
  const {
    asset: assetUpdated,
    success,
    error: errorAssetUpdated,
  } = assetUpdate;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  //   const vendorList = useSelector((state) => state.vendorList);
  //   const { vendors, error: errorvendorList } = vendorList;

  //   const categoryList = useSelector((state) => state.categoryList);
  //   const { categories, error: errorcategoryList } = categoryList;

  //   useEffect(() => {
  //     // dispatch(listVendors());
  //     // dispatch(listCategories());
  //     if (asset?.id) {
  //       dispatch({ type: ASSET_CREATE_RESET });
  //       navigate('/inventory');
  //     }
  //   }, [asset?.id, dispatch, navigate]);

  useEffect(() => {
    if (assetUpdated?.id && success) {
      dispatch({ type: ASSET_UPDATE_RESET });
      navigate('/inventory');
    } else {
      if (!asset.name || !asset.id) {
        dispatch(listAssetDetails(params.id));
      } else {
        setFormData({
          name: asset.name,
          serial_number: asset.serial_number,
          description: asset.description,
          price: asset.price,
        });
      }
    }
  }, [dispatch, success, navigate, params.id, asset]);

  const updateAssetHandler = (e) => {
    e.preventDefault();

    dispatch(updateAsset(params.id, formData));
  };

  const goBackHandler = () => {
    navigate('/inventory');
  };

  //   const handleCategoryChange = (e) => {
  //     setCategory(e.target.value);
  //     const subCat = categories[1].filter(
  //       (cat) => cat.category_parentId === e.target.value,
  //     );
  //     setSubCategory(subCat);
  //   };

  console.log('FormData ', formData);

  return (
    <ThemeProvider theme={theme}>
      <CardContainer>
        {error && <Error error={error} />}
        <form onSubmit={updateAssetHandler}>
          <Box display="flex" p={1} className={'border-card'}>
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
                  onClick={goBackHandler}
                >
                  <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                  Back
                </Typography>
                <Typography variant="h5" component="h5">
                  Edit Inventory
                </Typography>
              </Stack>
            </Box>
            <Box p={1}>
              <Button type="submit" fullWidth variant="contained" color="info">
                Cancel
              </Button>
            </Box>
            <Box p={1}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#31DE79' }}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Typography variant="b" component="b" sx={{ mt: 1 }}>
                  Item Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  id="name"
                  value={formData.name}
                  size="small"
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Serial Number</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="serialNumber"
                  value={formData.serial_number}
                  size="small"
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, serial_number: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: 1, m: 1, pb: 3 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Description</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>

          {/* <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Category</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="outlined-select-country"
                  select
                  label="Select Category"
                  sx={{ width: '400px' }}
                  size="small"
                  onChange={handleCategoryChange}
                >
                  {categories[0]?.map((option) => (
                    <MenuItem
                      key={option.category_id}
                      value={option.category_id}
                    >
                      {option.category_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box> */}
          <Divider />

          {/* <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Sub-Category</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="outlined-select-country"
                  select
                  label="Select Sub-Category"
                  sx={{ width: '400px' }}
                  size="small"
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                >
                  {subCategory?.map((option) => (
                    <MenuItem
                      key={option.category_id}
                      value={option.category_id}
                    >
                      {option.category_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box> */}

          <Divider />

          <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Price</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="price"
                  value={formData.price}
                  size="small"
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>

          {/* <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item md={3} xs={12}>
                <Typography sx={{ mt: 1 }}>
                  <b>Select Vendor</b>
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TextField
                  id="outlined-select-country"
                  select
                  label="Select Vendor"
                  // defaultValue="Pakistan"
                  sx={{ width: '400px' }}
                  size="small"
                  // helperText="Select Country"
                  onChange={(e) =>
                    setFormData({ ...formData, vendor: e.target.value })
                  }
                >
                  {vendors?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box> */}
        </form>
      </CardContainer>
    </ThemeProvider>
  );
};

export default InventoryEditPage;
