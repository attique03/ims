import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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

const RequestsCreatePage = () => {
  const [formData, setFormData] = useState({
    itemName: null,
    type: null,
    description: null,
    subCategory: null,
  });

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestsCreate = useSelector((state) => state.requestsCreate);
  const { requests, success, error } = requestsCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
    if (requests?.id && success) {
      dispatch({ type: REQUESTS_CREATE_RESET });
      navigate('/requests');
    }
  }, [requests?.id, dispatch, success, navigate]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const createRequestsHandler = (e) => {
    e.preventDefault();
    dispatch(createRequest(formData));
  };

  const handleGoBack = () => {
    navigate('/requests');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorcategoryList && <Error error={errorcategoryList} />}

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
                Create New Request
              </Typography>
            </Stack>
          </Box>

          <Box className={'header-right'}>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: 'cancel-btn' }}
              onClick={() => navigate('/requests')}
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
                <b>Item Name</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Enter Item Name"
                id="item"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, itemName: e.target.value })
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
                <b>Request Type</b>
              </Typography>
            </Grid>
            <Grid item md={9} xs={12}>
              <TextField
                id="request"
                select
                label="Select Request Type"
                sx={{ width: '400px' }}
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <MenuItem value="acquisition">Acquisition</MenuItem>
                <MenuItem value="faulty">Faulty</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }} variant="b" component="b">
                Description
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="description"
                label="Enter Description Here"
                multiline
                rows={4}
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </CardContainer>
  );
};

export default RequestsCreatePage;
