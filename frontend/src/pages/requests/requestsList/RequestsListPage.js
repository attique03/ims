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
import { listCategories } from '../../../redux/actions/category/categoryActions';
import { adminColumns, employeeColumns } from './requestsListData';
import { listRequests } from '../../../redux/actions/requests/requestsActions';
import { ADMIN, EMPLOYEE } from '../../../utils/constants';

const RequestsListPage = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [location, setLocation] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assetList = useSelector((state) => state.assetList);
  const { assets, error } = assetList;

  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error: errorRequestsList } = requestsList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAssets());
    dispatch(listCategories());
    dispatch(listRequests());

    // Filter the requests based on the search query
  }, [dispatch]);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAdd = () => {
    navigate('create');
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    let search = e.target.value;
    const filtered = assets.filter((request) =>
      request.asset_name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredInventory(filtered);
  };

  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Typography variant="h5" component="h5">
              Requests
            </Typography>
            {userInfo?.user?.role?.role === ADMIN && (
              <>
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
                  <InputLabel id="demo-select-small">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={category}
                    label="Location"
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
                      <MenuItem
                        key={option.category_id}
                        value={option.category_id}
                      >
                        {option.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Stack>
        </Box>
        {userInfo?.user?.role?.role === EMPLOYEE && (
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
        )}
      </Box>

      <Box sx={{ m: 2 }}>
        <DataTable
          columns={
            userInfo?.user?.role?.role === ADMIN
              ? adminColumns
              : employeeColumns
          }
          data={requests && requests}
          //   data={
          //     filteredInventory.length > 0 ? filteredInventory : assets && assets
          //   }
        />
      </Box>
    </CardContainer>
  );
};

export default RequestsListPage;
