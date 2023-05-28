import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { useNavigate } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import CardContainer from '../../../components/card/CardContainer';
import { COMPLAINT_CREATE_RESET } from '../../../redux/constants/complaint/complaintConstants';
import { createRequest } from '../../../redux/actions/requests/requestsActions';
import { ADMIN } from '../../../utils/constants';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import { REQUESTS_CREATE_RESET } from '../../../redux/constants/requests/requestsConstants';
import Error from '../../../components/error/Error';
import { VENDOR_CREATE_RESET } from '../../../redux/constants/vendor/vendorConstants';
import { createVendor } from '../../../redux/actions/vendor/vendorActions';
import Loader from '../../../components/loader/Loader';

export const options = [
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry', disabled: true },
];

const VendorCreatePage = () => {
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    subCategory: null,
  });

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vendorCreate = useSelector((state) => state.vendorCreate);
  const { vendor, success, error } = vendorCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  let subCategoryList = [];
  let subLength = subCategoryList.length > 0;

  useEffect(() => {
    dispatch(listCategories());

    if (vendor?.id && success) {
      dispatch({ type: VENDOR_CREATE_RESET });
      navigate('/vendors');
    }
  }, [vendor?.id, dispatch, success, navigate, subLength]);

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
    let tmp = [];
    if (selected) {
      selected.map((s) => tmp.push(s.value));

      console.log('Array', {
        name: formData.name,
        phone: formData.phone,
        subCategory: tmp,
      });
    }
    dispatch(
      createVendor({
        name: formData.name,
        phone: formData.phone,
        subCategory: tmp,
      }),
    );
  };

  const handleGoBack = () => {
    navigate('/vendors');
  };

  console.log('Selected ', selected);

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
                Add Vendor
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
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Name</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Full Name"
                id="item"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Contact Number</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Contact Number"
                id="item"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
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
                <b>Category</b>
              </Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                id="category"
                select
                label="Select Category"
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
        </Box>

        <Box sx={{ p: 1, m: 1 }}>
          <Grid container>
            <Grid item md={3} xs={12}>
              <Typography sx={{ mt: 1 }}>
                <b>Sub-Category</b>
              </Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              <MultiSelect
                className="input-width"
                options={selectedSubCategory}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
              {/* <TextField
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
              </TextField> */}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ m: 40 }} />

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

export default VendorCreatePage;
