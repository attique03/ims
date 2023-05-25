import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import CardContainer from '../../../components/card/CardContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './categoryCreate.css';
import { createCategory } from '../../../redux/actions/category/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../../components/error/Error';

const CategoryCreatePage = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([{ value: '' }]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success, error } = categoryCreate;

  const handleAddField = () => {
    const newFields = [...subCategory, { value: '' }];
    setSubCategory(newFields);
  };

  useEffect(() => {
    if (success) {
      navigate('/categories');
    }
  }, [success, navigate]);

  const handleFieldChange = (index, event) => {
    const { value } = event.target;
    const newFields = [...subCategory];
    newFields[index].value = value;
    setSubCategory(newFields);
  };

  const handleRemoveFields = (index) => {
    const values = [...subCategory];
    values.splice(index, 1);
    setSubCategory(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createCategory([category, subCategory]));
  };

  const handleGoBack = () => {
    navigate('/categories');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
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
              Add New Category
            </Typography>
          </Stack>
        </Box>
        <Box className={'header-right'}>
          <Button type="submit" fullWidth variant="contained" color="info">
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

      {/* Form */}
      <Box>
        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Category Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Category Name"
                id="category"
                defaultValue=""
                size="small"
                classes={{ root: 'input-width' }}
                required
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box variant="h3" component="h3" sx={{ ml: 2, mt: 5 }}>
          Sub-Categories
        </Box>

        {subCategory.map((field, index) => (
          <Box className={'box-spacing'}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ mt: 1 }} variant="b">
                  Sub-Category#{index + 1} Name
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  label={`subCategory#${index + 1} Name`}
                  id={`subCategory-${index + 1}`}
                  size="small"
                  classes={{ root: 'input-width' }}
                  required
                  name={`subCategory-${index + 1}`}
                  value={field.value}
                  onChange={(event) => handleFieldChange(index, event)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        <Box className={'header'}>
          <Box className={'header-left'}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} className={'icon-size'} />
              }
              classes={{ root: 'save-btn' }}
              onClick={handleAddField}
            >
              Add Sub-Category
            </Button>
          </Box>

          <Box>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faRemove} className={'icon-size'} />
              }
              color="error"
              onClick={handleRemoveFields}
            >
              Remove Sub-Category
            </Button>
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default CategoryCreatePage;
