import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import CardContainer from '../../../components/card/CardContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';

const CategoryCreatePage = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([{ value: '' }]);
  const [categories, setCategories] = useState([]);

  const handleAddField = () => {
    const newFields = [...subCategory, { value: '' }];
    setSubCategory(newFields);
  };

  const handleFieldChange = (index, event) => {
    const { value } = event.target;
    const newFields = [...subCategory];
    newFields[index].value = value;
    setSubCategory(newFields);
  };

  const handleRemoveFields = (index) => {
    console.log('Index ==> ', index);
    const values = [...subCategory];
    values.splice(index, 1);
    setSubCategory(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategories([category, subCategory]);

    console.log('Category ==>   ', category);
    console.log('SubCategories Values ==>   ', subCategory);
  };

  console.log('Categoriesss ==> ', categories);

  return (
    <CardContainer>
      {/* Header */}
      <Box style={{ width: '100%', borderBottom: '1px solid #E0E0E0' }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Stack direction="row" spacing={2}>
              <Typography
                component="caption"
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'stretch',
                  color: '#808080',
                }}
              >
                <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                Back
              </Typography>
              <Typography variant="h5" component="h5">
                Add New Category
              </Typography>
            </Stack>
          </Box>
          <Box p={1}>
            <Button type="submit" fullWidth variant="contained" color="info">
              Cancel
            </Button>
          </Box>
          <Box
            p={1}
            component="form"
            onClick={handleSubmit}
            noValidate
            // sx={{ mt: 1 }}
          >
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
      </Box>

      {/* Form */}
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
          }}
        >
          <Typography sx={{ mt: 1 }} variant="b">
            Category Name
          </Typography>
          <Box sx={{ ml: 16 }}>
            <TextField
              label="Category Name"
              id="category"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
              required
              name="category"
              autoComplete="category"
              autoFocus
              onChange={(e) => setCategory(e.target.value)}
            />
          </Box>
        </Box>
        <Box variant="h3" component="h3" sx={{ ml: 2, mt: 5 }}>
          Sub-Categories
        </Box>

        {subCategory.map((field, index) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: 1,
              m: 1,
            }}
          >
            <Typography sx={{ mt: 1 }} variant="b">
              Sub-Category#{index + 1} Name
            </Typography>
            <Box sx={{ ml: 10 }}>
              <TextField
                label={`subCategory#${index + 1} Name`}
                id={`subCategory-${index + 1}`}
                defaultValue=""
                size="small"
                sx={{ width: '400px' }}
                required
                name={`subCategory-${index + 1}`}
                autoComplete="subCategory"
                autoFocus
                value={field.value}
                onChange={(event) => handleFieldChange(index, event)}
              />
            </Box>
          </Box>
        ))}

        <Box p={1} sx={{ display: 'flex' }}>
          <Box flexGrow={1}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
              }
              sx={{ backgroundColor: '#31DE79' }}
              onClick={handleAddField}
            >
              Add Sub-Category
            </Button>
          </Box>

          <Box>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faRemove} style={{ height: '13px' }} />
              }
              color="error"
              //   sx={{ backgroundColor: '#31DE79' }}
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
