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

const InventoryListPage = () => {
  const [location, setLocation] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assetList = useSelector((state) => state.assetList);
  const { assets, error } = assetList;

  useEffect(() => {
    dispatch(listAssets());
  }, [dispatch]);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAdd = () => {
    navigate('create');
  };

  return (
    <CardContainer>
      <Box display="flex" p={1} sx={{ mb: 4 }}>
        <Box p={1} flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Inventory
            </Typography>
            <TextField
              label="Search"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '200px' }}
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
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">Select Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={location}
                label="Location"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="lahore">Lahore</MenuItem>
                <MenuItem value="london">London</MenuItem>
                <MenuItem value="berlin">Berlin</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">
                Select Sub-Category
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={location}
                label="Location"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="lahore">Lahore</MenuItem>
                <MenuItem value="london">London</MenuItem>
                <MenuItem value="berlin">Berlin</MenuItem>
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
        <DataTable columns={tableColumns} data={assets && assets} />
      </Box>
    </CardContainer>
  );
};

export default InventoryListPage;
