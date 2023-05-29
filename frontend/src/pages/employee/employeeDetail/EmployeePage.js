import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  faAdd,
  faArrowDownZA,
  faArrowUpAZ,
  faEllipsisV,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listComplaints } from '../../../redux/actions/complaint/complaintActions';
import CardContainer from '../../../components/card/CardContainer';
import Error from '../../../components/error/Error';
import TabPanel from '../../../components/tab/tabPanel/TabPanel';
import DataTable from '../../../components/table/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  adminColumns,
  employeeColumns,
} from '../../../components/complaint/admin/complaintListAdmin/ComplaintListDataAdmin';
import MenuActions from '../../../components/menu/Menu';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  deleteUser,
  getUserDetails,
} from '../../../redux/actions/user/userActions';
import { listAssets } from '../../../redux/actions/asset/assetActions';
import { assetColumns, requestColumns } from './employeeData';
import { listRequests } from '../../../redux/actions/requests/requestsActions';
import { listCategories } from '../../../redux/actions/category/categoryActions';
import { USER_DELETE_RESET } from '../../../redux/constants/user/userConstants';
// import { listComplaints } from '../../../../redux/actions/complaint/complaintActions';
// import DataTable from '../../../../components/table/Table';
// import CardContainer from '../../../../components/card/CardContainer';
// import { employeeColumns, adminColumns } from './ComplaintListDataAdmin';
// import TabPanel from '../../../tab/tabPanel/TabPanel';
// import Error from '../../../error/Error';
// import { PENDING, RESOLVED } from '../../../../utils/constants';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const EmployeePage = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [location, setLocation] = useState('');

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, error: errorUserDelete } = userDelete;

  const assetList = useSelector((state) => state.assetList);
  const { assets, error: errorAssetList } = assetList;

  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error: errorRequestsList } = requestsList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error: errorcategoryList } = categoryList;

  useEffect(() => {
    dispatch(getUserDetails(params.id));
    dispatch(listAssets(params.id));
    dispatch(listRequests('', params.id));
    dispatch(listCategories());

    if (success) {
      dispatch({ type: USER_DELETE_RESET });
      navigate('/employees');
      return;
    }
  }, [dispatch, params, success, navigate]);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (newValue === 0) {
    //   dispatch(listComplaints(true));
    // } else if (newValue === 1) {
    //   dispatch(listComplaints());
    // }
  };

  const handleChangeCategory = (event) => {
    setLocation(event.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const subCat = categories[1].filter(
      (cat) => cat.category_parentId === e.target.value,
    );
    setSubCategory(subCat);
  };

  const handleGoBack = () => {
    navigate('/employees');
  };

  console.log('Requests ', params, requests);

  return (
    <CardContainer>
      {error && <Error error={error} />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography classes={{ root: 'back' }} onClick={handleGoBack}>
              <ArrowBackIcon classes={{ root: 'back-icon' }} />
              Back
            </Typography>
          </Stack>
        </Box>

        <Box p={1}>
          <IconButton
            aria-label="Example"
            onClick={handleClickOpen}
            classes={{ root: 'icon-background' }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
          <MenuActions
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('edit')} disableRipple>
              <div className="edit-color">
                <EditOutlinedIcon classes={{ root: 'edit-color' }} />
              </div>
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => dispatch(deleteUser(params.id))}
              disableRipple
            >
              <DeleteOutlineOutlinedIcon classes={{ root: 'delete-color' }} />
              Delete
            </MenuItem>
          </MenuActions>
        </Box>
      </Box>

      <Box className={'content'}>
        <Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Tabs"
            align="left"
            TabIndicatorProps={{
              sx: {
                display: 'none',
              },
            }}
          >
            <Tab
              label="General Information"
              {...a11yProps(0)}
              classes={{ root: value === 0 && 'tab' }}
              selected={false}
            />
            <Tab
              label="Inventory"
              {...a11yProps(1)}
              classes={{ root: value === 1 && 'tab' }}
              selected={false}
            />
            <Tab
              label="Request"
              {...a11yProps(2)}
              classes={{ root: value === 2 && 'tab' }}
              selected={false}
            />
          </Tabs>
        </Box>
        <Box className={'tab-content'}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChange}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Box sx={{ mx: 2, mb: 4 }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={2}>
                    {' '}
                    <Avatar
                      src={`/uploads/${user?.image?.split('/')[3]}`}
                      className={'profile-image'}
                      alt="profile-image"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography sx={{ mb: 1 }}>{user?.name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ my: 3 }}>
                  <Grid item xs={3}>
                    <Typography variant="b" component="b">
                      Email Address
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography sx={{ mb: 1 }}>{user?.email}</Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Grid container spacing={2} sx={{ my: 3 }}>
                  <Grid item xs={3}>
                    <Typography variant="b" component="b">
                      Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography sx={{ mb: 1 }}>{user?.phone}</Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Grid container spacing={2} sx={{ my: 3 }}>
                  <Grid item xs={3}>
                    <Typography variant="b" component="b">
                      Department
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography sx={{ mb: 1 }}>
                      {user?.department?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  sx={{ mb: 3 }}
                >
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
                      onChange={handleChangeCategory}
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
                </Stack>
                <DataTable columns={assetColumns} data={assets && assets} />
              </>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <DataTable columns={requestColumns} data={requests && requests} />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default EmployeePage;
