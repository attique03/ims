import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import DataTable from '../../../components/table/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { listOrganizationDetails } from '../../../redux/actions/organizationActions';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPen } from '@fortawesome/free-solid-svg-icons';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { listUsers } from '../../../redux/actions/userActions';
import './organization.css';

const tableColumns = ['ID', 'Image', 'Name', 'Email', 'Contact No.', 'Action'];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function OrganizationPage() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const organizationDetails = useSelector((state) => state.organizationDetails);
  const { organization, error } = organizationDetails;

  const userList = useSelector((state) => state.userList);
  const { users, error: errorUserList } = userList;

  useEffect(() => {
    dispatch(listOrganizationDetails(params.id));
    dispatch(listUsers(params.id));
  }, [dispatch, params]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleGoBack = () => {
    navigate('/organizations');
  };

  return (
    <Container style={{ maxWidth: '1200px', mb: 3 }}>
      <Card sx={{ borderRadius: '15px', boxShadow: 3, my: 5 }}>
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
                <IconButton
                  aria-label="Example"
                  onClick={handleGoBack}
                  classes={{ root: 'icon-button' }}
                >
                  <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                  Back
                </IconButton>
              </Typography>
            </Stack>
          </Box>

          <Box p={1}>
            <IconButton
              aria-label="Example"
              onClick={handleClick}
              classes={{ root: 'icon-background' }}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <div className="edit-color">
                  {/* <FontAwesomeIcon icon={faPen} className={'edit-color'} /> */}
                  <EditOutlinedIcon classes={{ root: 'edit-color' }} />
                </div>
                Edit
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} disableRipple>
                <DeleteOutlineOutlinedIcon classes={{ root: 'delete-color' }} />
                Delete
              </MenuItem>
            </StyledMenu>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ justifyContent: 'flex-start' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
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
                classes={{ root: value === 0 && 'customized-tab' }}
                selected={false}
              />
              <Tab
                label="Admins"
                {...a11yProps(1)}
                classes={{ root: value === 1 && 'customized-tab' }}
                selected={false}
              />
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 1, borderLeft: '1px solid #E0E0E0' }}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                      <img
                        src={`/uploads/${organization?.image?.split('/')[3]}`}
                        // src={
                        //   organization.image ? organization.image : '/wp2.png'
                        // }
                        className={'logo'}
                        alt="organization-logo"
                      />
                    </Grid>
                    <Grid item xs={10.5}>
                      <Typography variant="h5" component="h5">
                        {organization && organization.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {organization && organization.email}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
                    <Grid item xs={3}>
                      <Typography>Bio</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>
                        {organization && organization.bio}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider />

                  <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
                    <Grid item xs={3}>
                      <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>
                        {organization && organization.address}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider />

                  <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
                    <Grid item xs={3}>
                      <Typography>Representative Name</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>
                        {organization && organization.representativeName}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ py: 1, my: 1 }}>
                    <Grid item xs={3}>
                      <Typography>Representative Contact</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>
                        {organization && organization.representativeContact}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <DataTable columns={tableColumns} data={users && users} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}