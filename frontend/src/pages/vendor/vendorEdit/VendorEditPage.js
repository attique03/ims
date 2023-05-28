import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContainer from '../../../components/card/CardContainer';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import {
  VENDOR_CREATE_RESET,
  VENDOR_UPDATE_RESET,
} from '../../../redux/constants/vendor/vendorConstants';
import {
  createVendor,
  getVendorDetails,
  updateVendor,
} from '../../../redux/actions/vendor/vendorActions';
import Loader from '../../../components/loader/Loader';
import Error from '../../../components/error/Error';

export const options = [
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry', disabled: true },
];

const VendorEditPage = () => {
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
  });

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const vendorUpdate = useSelector((state) => state.vendorUpdate);
  const { vendor, success, error } = vendorUpdate;

  const vendorDetails = useSelector((state) => state.vendorDetails);
  const { vendor: vendorDetail, error: vendorDetailError } = vendorDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  let subCategoryList = [];
  let subLength = subCategoryList.length > 0;

  useEffect(() => {
    // dispatch(listCategories());

    if (vendor?.id && success) {
      dispatch({ type: VENDOR_UPDATE_RESET });
      navigate('/vendors');
    } else {
      if (!vendorDetail.name || !vendorDetail.id) {
        dispatch(getVendorDetails(params.id));
      } else {
        setFormData({
          name: vendorDetail.name,
          phone: vendorDetail.phone,
          //   subCategory: vendorDetail.subCategory.map((sub) => ({
          //     label: sub.name,
          //     value: sub.id,
          //   })),
        });
      }
    }
  }, [vendor?.id, dispatch, success, navigate, params.id, vendorDetail]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    categories[1].forEach((cat) => {
      if (cat.category_parentId === e.target.value) {
        console.log('In Depth', cat);
        subCategoryList.push({
          label: cat.category_name,
          value: cat.category_id,
        });
      }
      console.log('In Depth 2', subCategoryList);
      setSelectedSubCategory(subCategoryList);
    });

    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const createRequestsHandler = (e) => {
    e.preventDefault();
    // let tmp = [];
    // if (selected) {
    //   selected.map((s) => tmp.push(s.value));

    //   console.log('Array', {
    //     name: formData.name,
    //     phone: formData.phone,
    //     subCategory: tmp,
    //   });
    // }
    dispatch(
      updateVendor(params.id, formData),
      //   updateVendor({
      //     name: formData.name,
      //     phone: formData.phone,
      //     // subCategory: tmp,
      //   }),
    );
  };

  const handleGoBack = () => {
    navigate('/vendors');
  };

  //   console.log('Categories ', categories);

  //   console.log(
  //     'Detail ',
  //     formData,
  //     typeof selected.length,
  //     selectedSubCategory,
  //     vendorDetail &&
  //       vendorDetail?.subCategory?.length > 0 &&
  //       vendorDetail?.subCategory[0]?.parent?.name,
  //   );

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorcategoryList && <Error error={errorcategoryList} />}
      {loadingState && <Loader />}

      <form onSubmit={createRequestsHandler}>
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
                Edit Vendor
              </Typography>
            </Stack>
          </Box>

          <Box className={'header-right'}>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: 'cancel-btn' }}
              onClick={handleGoBack}
            >
              Cancel
            </Button>
          </Box>

          <Box className={'header-right'}>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: 'save-btn' }}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box className={'box-spacing'}>
          <Grid container sx={{ my: 5 }}>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Name</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                // label="Full Name"
                id="item"
                size="small"
                value={formData.name}
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Contact Number</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                // label={formData?.phone"Contact Number"}
                id="item"
                size="small"
                value={formData.phone}
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Divider /> */}

        {/* <Box sx={{ p: 1, m: 1 }}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Typography sx={{ mt: 1 }}>
                <b>Category</b>
              </Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                id="category"
                select
                label="Select Category"
                value={
                  categories[0]?.length > 0 &&
                  vendorDetail &&
                  vendorDetail?.subCategory?.length > 0 &&
                  vendorDetail?.subCategory[0]?.parent?.id
                }
                sx={{ width: '400px' }}
                size="small"
                onChange={handleCategoryChange}
              >
                {categories[0]?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box> */}

        {/* <Box sx={{ p: 1, m: 1 }}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Typography sx={{ mt: 1 }}>
                <b>Sub-Category</b>
              </Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              <MultiSelect
                className="input-width"
                options={
                  selectedSubCategory && selectedSubCategory?.length > 0
                    ? selectedSubCategory
                    : formData &&
                      formData?.subCategory?.length > 0 &&
                      formData?.subCategory
                }
                value={
                  selected && selected?.length > 0
                    ? selected
                    : formData &&
                      formData?.subCategory?.length > 0 &&
                      formData?.subCategory
                }
                onChange={setSelected}
                labelledBy="Select"
              />

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
                {subCategory.length === 0 && (
                  <Error error="Please First Select Category" />
                )}
                {subCategory?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box> */}

        <Box sx={{ m: 20 }} />

        {/* <Box>
          <h1>Select Fruits</h1>
          <pre>{JSON.stringify(selected)}</pre>
          <MultiSelect
            options={selectedSubCategory}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </Box>*/}
      </form>
    </CardContainer>
  );
};

export default VendorEditPage;
