import { Link, useNavigate } from 'react-router-dom';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { useEffect } from 'react';
import { listComplaints } from '../../../redux/actions/complaint/complaintActions';
import Error from '../../error/Error';
import { employeeColumns } from '../../complaint/admin/complaintListAdmin/ComplaintListDataAdmin';
import './dashboardEmployee.css';

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

  useEffect(() => {
    dispatch(listComplaints());
  }, [dispatch]);

  const handleProfileEdit = () => {
    navigate('profile/edit');
  };

  return (
    <CardContainer>
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
            startIcon={<FontAwesomeIcon icon={faAdd} className="icon-size" />}
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
          <Avatar
            // src={`/uploads/${complaint?.image?.split('/')[3]}`}
            src="/uploads/image-1681766268555.jpg"
            className={'user-profile'}
            alt="attachments"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Full Name</Typography>
          <Typography variant="b" component="b">
            John Doe
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Designation</Typography>
          <Typography variant="b" component="b">
            Jr. Software Engineer
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Contact Number</Typography>
          <Typography variant="b" component="b">
            +92304234618
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Company Experience</Typography>
          <Typography variant="b" component="b">
            2 Years
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }} className={'box-spacing'}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={3}>
          <Typography>Email Address</Typography>
          <Typography variant="b" component="b">
            john@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Department</Typography>
          <Typography variant="b" component="b">
            Development
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Education</Typography>
          <Typography variant="b" component="b">
            BSCS
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Total Experience</Typography>
          <Typography variant="b" component="b">
            6 Years
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
      <DataTable columns={requestColumns} data={complaints && complaints} />

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
      <DataTable columns={employeeColumns} data={complaints && complaints} />
    </CardContainer>
  );
};

export default DashboardEmployee;
