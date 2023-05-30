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
import CardContainer from '../../../components/card/CardContainer';
import { listAssets } from '../../../redux/actions/asset/assetActions';
import { tableColumns } from './inventoryListData';
import {
  fetchCategoryDetails,
  listCategories,
} from '../../../redux/actions/category/categoryActions';
import Loader from '../../../components/loader/Loader';
import Error from '../../../components/error/Error';

const InventoryListPage = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [subCatValue, setSubCatValue] = React.useState('');

  const [searchValue, setSearchValue] = React.useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [filteredOnSubCategory, setFilteredOnSubCategory] = useState([]);
  const [filteredOnCategory, setFilteredOnCategory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assetList = useSelector((state) => state.assetList);
  const { assets, error } = assetList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorCategoryList } = categoryList;

  const categoryFetch = useSelector((state) => state.categoryFetch);
  const { categoryFetched, error: errorcategoryFetched } = categoryFetch;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    dispatch(listAssets());
    dispatch(listCategories());

    if (categoryFetched && categoryFetched?.name) {
      console.log('Category fetched ', categoryFetched);

      let search = categoryFetched?.name;
      const filtered = assets.filter((asset) =>
        asset.categoryName.toLowerCase().includes(search.toLowerCase()),
      );

      setFilteredOnCategory(filtered);
    }

    // Filter the requests based on the search query
  }, [dispatch, categoryFetched, category]);

  const handleChange = (event) => {
    setSubCatValue(event.target.value);
  };

  const handleAdd = () => {
    navigate('create');
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    // if (e.target.value === '') {
    setFilteredOnCategory('');
    setFilteredOnSubCategory('');
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
    const filtered = assets.filter((request) =>
      request.asset_name.toLowerCase().includes(search.toLowerCase()),
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
    const filtered = assets.filter((subCat) =>
      subCat.subcategoryName.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOnSubCategory(filtered);
  };

  const handleFilterCategory = (e) => {
    e.preventDefault();
    setSearchValue('');
    setFilteredInventory('');
    setSubCatValue(e.target.value);

    let search = e.target.value;
    const filtered = assets.filter((subCat) =>
      subCat.subcategoryName.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredOnSubCategory(filtered);
  };

  console.log(
    'SubCategory ',
    filteredOnCategory,
    filteredOnSubCategory,
    subCategory,
    category,
    subCatValue,
  );

  return (
    <CardContainer>
      {error && <Error error={error} />}

      {loadingState && <Loader />}
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography variant="h5" component="h5">
              Inventory
            </Typography>
            <TextField
              label="Search"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '200px' }}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ height: '13px' }}
                    />
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
                onChange={handleCategoryChange}
              >
                {errorCategoryList && <Error error={errorCategoryList} />}
                <MenuItem value="">None</MenuItem>
                {categories &&
                  categories[0]?.map((option) => (
                    <MenuItem
                      key={option.category_id}
                      value={option.category_id}
                    >
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
            startIcon={
              <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
            }
            sx={{ backgroundColor: '#31DE79' }}
            onClick={handleAdd}
          >
            Add
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
              : assets && assets
          }
        />
      </Box>
    </CardContainer>
  );
};

export default InventoryListPage;
