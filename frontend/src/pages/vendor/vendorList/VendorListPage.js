import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../components/table/Table';
import { tableColumns } from './vendorListData';
import CardContainer from '../../../components/card/CardContainer';
import { listVendors } from '../../../redux/actions/vendor/vendorActions';
import { listUsers } from '../../../redux/actions/user/userActions';
import Error from '../../../components/error/Error';
import { listDepartments } from '../../../redux/actions/department/departmentActions';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import Loader from '../../../components/loader/Loader';

const VendorListPage = () => {
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [location, setLocation] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { vendors, error } = vendorList;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  useEffect(() => {
    dispatch(listVendors());
    dispatch(listCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAdd = () => {
    navigate('create');
  };

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorcategoryList && (
        <Error title={'Error Fetching Categories'} error={errorcategoryList} />
      )}
      {loadingState && <Loader />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Vendors
            </Typography>
            <TextField
              label="Search"
              id="search"
              size="small"
              classes={{ root: 'icon-box' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faSearch} className="icon-size" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-select-small">Select Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={category}
                label="Location"
                onChange={handleCategoryChange}
              >
                {categories[0]?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-select-small">
                Select Sub-Category
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={location}
                label="Category"
                onChange={handleChange}
              >
                {subCategory?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl classes={{ root: 'icon-box' }} size="small">
              <InputLabel id="department">Department</InputLabel>
              <Select
                labelId="department"
                id="department"
                value={department}
                label="Department"
                onChange={handleChange}
              >
                {departments?.map((dept) => (
                  <MenuItem value={dept.name}>{dept.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Stack>
        </Box>
        <Box p={1}>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} className="icon-size" />}
            classes={{ root: 'add-btn' }}
            onClick={handleAdd}
          >
            Add Vendor
          </Button>
        </Box>
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable columns={tableColumns} data={vendors && vendors} />
      </Box>
    </CardContainer>
  );
};

export default VendorListPage;