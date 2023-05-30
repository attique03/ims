import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import CardContainer from '../../card/CardContainer';
import DataTable from '../../table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { listComplaints } from '../../../redux/actions/complaint/complaintActions';
import Error from '../../error/Error';
import { employeeColumns } from '../../complaint/admin/complaintListAdmin/ComplaintListDataAdmin';
import './dashboardEmployee.css';
import { getUserDetails } from '../../../redux/actions/user/userActions';
import { USER_DETAILS_RESET } from '../../../redux/constants/user/userConstants';
import Loader from '../../loader/Loader';
import { complaintsColumns, requestsColumns } from './dashboardTableColumns';
import { listRequests } from '../../../redux/actions/requests/requestsActions';

export const requestColumns = [
  'ID',
  'Item Name',
  'Category',
  'Sub Category',
  'Type',
  'Date',
  'Status',
  'Action',
];
const DashboardEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const complaintList = useSelector((state) => state.complaintList);
  const { complaints, error } = complaintList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error: errorUserDetails } = userDetails;

  const requestsList = useSelector((state) => state.requestsList);
  const { requests, error: errorRequestsList } = requestsList;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(getUserDetails(userInfo?.user?.id));
    dispatch(listComplaints());
    dispatch(listRequests());
  }, [dispatch, userInfo?.user?.id]);

  const handleProfileEdit = () => {
    navigate('profile/edit');
  };

  return (
    <CardContainer>
      {errorUserDetails && <Error error={errorUserDetails} />}

      {loadingState && <Loader />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Dashboard
            </Typography>
          </Stack>
        </Box>
        <Box className={'header-right'}>
          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            classes={{ root: 'create-button' }}
            onClick={handleProfileEdit}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      <Grid
        container
        // columnSpacing={{ xs: 4, sm: 4, md: 5 }}
        spacing={2}
        className={'box-spacing'}
      >
        <Grid item xs={1.5}>
          {/* <Avatar
            src={`/uploads/${complaint?.image?.split('/')[3]}`}
            src="/uploads/image-1681766268555.jpg"
            className={'user-profile'}
            alt="attachments"
          /> */}

          <Avatar
            src={`/uploads/${user?.image?.split('/')[3]}`}
            className={'profile-image'}
            alt="profile-image"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Full Name</Typography>
          <Typography variant="b" component="b">
            {user?.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Designation</Typography>
          <Typography variant="b" component="b">
            {user?.designation}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Contact Number</Typography>
          <Typography variant="b" component="b">
            {user?.phone}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Company Experience</Typography>
          <Typography variant="b" component="b">
            {user?.companyExperience} Year(s)
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }} className={'box-spacing'}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={3}>
          <Typography>Email Address</Typography>
          <Typography variant="b" component="b">
            {user?.email}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Department</Typography>
          <Typography variant="b" component="b">
            {user?.department?.name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Education</Typography>
          <Typography variant="b" component="b">
            {user?.education}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Total Experience</Typography>
          <Typography variant="b" component="b">
            {user?.totalExperience} Years
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box className={'header'}>
        <Box className={'header-left'}>
          <Typography variant="h5" component="h5">
            Recent Requests
          </Typography>
        </Box>
        <Box className={'header-right'}>
          <Link to={'/requests'} className={'nav-link'}>
            See All
          </Link>
        </Box>
      </Box>
      {error && <Error error={error} />}
      <DataTable
        columns={requestsColumns}
        data={requests && requests}
        viewType="requests"
      />

      <Box className={'header'} sx={{ mt: 3 }}>
        <Box className={'header-left'}>
          <Typography variant="h5" component="h5">
            Recent Complaints
          </Typography>
        </Box>
        <Box className={'header-right'}>
          <Link to={'/complaints'} className={'nav-link'}>
            See All
          </Link>
        </Box>
      </Box>
      {error && <Error error={error} />}
      <DataTable
        columns={complaintsColumns}
        data={complaints && complaints}
        viewType="complaints"
      />
    </CardContainer>
  );
};

export default DashboardEmployee;
