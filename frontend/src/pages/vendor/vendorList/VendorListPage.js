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
import {
  fetchCategoryDetails,
  listCategories,
} from '../../../redux/actions/category/categoryActions';
import Loader from '../../../components/loader/Loader';

const VendorListPage = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [subCatValue, setSubCatValue] = React.useState('');

  const [searchValue, setSearchValue] = React.useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [filteredOnSubCategory, setFilteredOnSubCategory] = useState([]);
  const [filteredOnCategory, setFilteredOnCategory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { vendors, error } = vendorList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  const categoryFetch = useSelector((state) => state.categoryFetch);
  const { categoryFetched, error: errorcategoryFetched } = categoryFetch;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    dispatch(listVendors());
    dispatch(listCategories());

    if (categoryFetched && categoryFetched?.name) {
      console.log('Category fetched ', categoryFetched);

      let search = categoryFetched?.name;
      const filtered = vendors.filter((asset) =>
        asset.categoryName.toLowerCase().includes(search.toLowerCase()),
      );

      setFilteredOnCategory(filtered);
    }
  }, [dispatch, categoryFetched, category, vendors?.id]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    // if (e.target.value === '') {
    setFilteredOnCategory('');
    setFilteredOnSubCategory('');
    // }
    // if (e.target.value === '') {
    //   setSubCategory('');
    // }
    if (e.target.value) {
      dispatch(fetchCategoryDetails(e.target.value));
      console.log('After Dispatch ', e.target.value);
    }

    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCategory('');
    setSubCatValue('');
    setFilteredOnCategory('');
    setFilteredOnSubCategory('');
    setSearchValue(e.target.value);

    let search = e.target.value;
    const filtered = vendors.filter((request) =>
      request.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredInventory(filtered);
  };

  const handleFilterSubCategory = (e) => {
    e.preventDefault();
    if (e.target.value === '') {
      console.log('Filter Sub Category ', e.target.value);
      setCategory('');
    }
    setFilteredOnCategory('');
    setSearchValue('');
    setFilteredInventory('');
    setSubCatValue(e.target.value);

    let search = e.target.value;

    console.log('Search ', search);

    // const filtered = vendors.filter((subCat) =>
    //   subCat.subCategories.filter((subCt) =>
    //     subCt.toLowerCase().includes(search.toLowerCase()),
    //   ),
    // );

    const filtered = vendors.filter((vendor) => {
      return vendor.subCategories.some((sbCt) =>
        sbCt.toLowerCase().includes(search.toLowerCase()),
      );
    });

    console.log('Filtered ', filtered);

    setFilteredOnSubCategory(filtered);
  };

  const handleAdd = () => {
    navigate('create');
  };

  console.log('Filtered On SubCategory', filteredOnSubCategory);

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
              onChange={handleSearch}
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
                {categories && <MenuItem value="">None</MenuItem>}
                {categories[0]?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-select-small">
                Select Sub-Category
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Category"
                value={subCatValue}
                onChange={handleFilterSubCategory}
              >
                {subCategory?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl sx={{ width: 200 }} size="small">
              <InputLabel id="demo-select-small">
                Select Sub-Category
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={subCatValue}
                label="Category"
                onChange={handleFilterSubCategory}
              >
                {subCategory.length === 0 && (
                  <Error
                    title="Sub-Category"
                    error={'Please Select Catgeory'}
                    severity="info"
                  />
                )}
                {subCategory && <MenuItem value="">None</MenuItem>}
                {subCategory?.map((option) => (
                  <MenuItem
                    key={option.category_id}
                    value={option.category_name}
                  >
                    {option.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        <DataTable
          columns={tableColumns}
          data={
            filteredInventory.length > 0
              ? filteredInventory
              : filteredOnCategory.length > 0
              ? filteredOnCategory
              : filteredOnSubCategory.length > 0
              ? filteredOnSubCategory
              : vendors && vendors
          }
        />
      </Box>
    </CardContainer>
  );
};

export default VendorListPage;
