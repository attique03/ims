import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardContainer from '../../../components/card/CardContainer';
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategoryDetails,
  updateCategory,
} from '../../../redux/actions/category/categoryActions';
import {
  CATEGORY_FETCH_RESET,
  CATEGORY_UPDATE_RESET,
} from '../../../redux/constants/category/categoryConstants';

const CategoryEditPage = () => {
  const [formData, setFormData] = useState({
    name: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const categoryFetch = useSelector((state) => state.categoryFetch);
  const { categoryFetched, error: errorcategoryFetched } = categoryFetch;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { category: categoryUpdated, success, error } = categoryUpdate;

  useEffect(() => {
    if (categoryUpdated?.id && success) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch({ type: CATEGORY_FETCH_RESET });
      navigate('/categories');
    } else {
      if (!categoryFetched?.name || !categoryFetched?.id) {
        console.log('In Dispatch ', categoryFetched);
        dispatch(fetchCategoryDetails(id));
      } else {
        setFormData({
          name: categoryFetched.name,
        });
      }
    }
  }, [dispatch, id, success, navigate, categoryFetched, categoryUpdated]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateCategory(id, formData));
  };

  console.log('Category: Name ', id, formData);

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
              Edit Category
            </Typography>
          </Stack>
        </Box>
        <Box className={'header-right'}>
          <Button
            type="submit"
            onClick={handleGoBack}
            fullWidth
            variant="contained"
            color="info"
          >
            Cancel
          </Button>
        </Box>
        <Box p={1} component="form" onClick={handleSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            classes={{ root: 'save-btn' }}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box className={'box-spacing'}>
        <Grid container>
          <Grid item xs={3}>
            <Typography sx={{ mt: 1 }}>Category Name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              value={formData.name}
              id="category"
              size="small"
              classes={{ root: 'input-width' }}
              required
              name="category"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Box>
    </CardContainer>
  );
};

export default CategoryEditPage;
