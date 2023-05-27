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
import { tableColumns } from './returnsListData';
import { listRequests } from '../../../redux/actions/requests/requestsActions';
import { ADMIN, EMPLOYEE, PENDING, RESOLVED } from '../../../utils/constants';

const ReturnsListPage = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [location, setLocation] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

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
    dispatch(listRequests('faulty'));

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

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
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
              Returns
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
                <FormControl classes={{ root: 'icon-box' }} size="small">
                  <InputLabel id="status">Select Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={status}
                    label="Select Status"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={PENDING}>{PENDING}</MenuItem>
                    <MenuItem value={RESOLVED}>{RESOLVED}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl classes={{ root: 'icon-box' }} size="small">
                  <InputLabel id="type">Select Type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    value={status}
                    label="Select Type"
                    onChange={handleChangeType}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="repair">Repair</MenuItem>
                    <MenuItem value="replace">Replace</MenuItem>
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
          columns={tableColumns}
          data={requests && requests}
          //   data={
          //     filteredInventory.length > 0 ? filteredInventory : assets && assets
          //   }
        />
      </Box>
    </CardContainer>
  );
};

export default ReturnsListPage;
