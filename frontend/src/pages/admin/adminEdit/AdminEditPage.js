import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import { listOrganizations } from '../../../redux/actions/organization/organizationActions';
import {
  USER_CREATE_RESET,
  USER_UPDATE_RESET,
} from '../../../redux/constants/user/userConstants';
import {
  createUser,
  getUserDetails,
  updateUser,
} from '../../../redux/actions/user/userActions';
import axios from 'axios';
import CardContainer from '../../../components/card/CardContainer';
import Error from '../../../components/error/Error';
import Loader from '../../../components/loader/Loader';

const AdminEditPage = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    // password: '',
    phone: '',
    // organization: 0,
  });
  const [email, setEmail] = useState();
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const imgUrl =
    'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png';

  const userDetails = useSelector((state) => state.userDetails);
  const { user: userDetail, error: errorUserDetail } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { user, success, error: errorUserUpdated } = userUpdate;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  //   useEffect(() => {
  //     dispatch(listOrganizations());
  //     if (user?.id) {
  //       dispatch({ type: USER_CREATE_RESET });
  //       navigate('/admins');
  //     }
  //    }, [user?.id, dispatch, navigate, formData?.image]);

  useEffect(() => {
    if (image) {
      setFormData({
        ...formData,
        image: image,
      });
    }

    if (user?.id && success) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admins');
    } else {
      if (!userDetail.name || !userDetail.id) {
        dispatch(getUserDetails(params.id));
      } else {
        if (
          !formData.image &&
          !formData.name &&
          !formData.email &&
          !formData.phone
        ) {
          setFormData({
            image: userDetail.image,
            name: userDetail.name,
            email: userDetail.email,
            phone: userDetail.phone,
          });
        }
      }
    }
  }, [dispatch, success, navigate, params.id, image, user, userDetail]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(params.id, {
        ...formData,
        image: image ? image : formData.image,
      }),
    );
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post('http://127.0.0.1:4000/upload', formData);

    if (data) {
      setImage(data);
      //   setFormData({
      //     ...formData,
      //     image: data,
      //   });
    }
  };

  const handleGoBack = () => {
    navigate('/admins');
  };

  console.log('Form Data ', formData);

  return (
    <CardContainer>
      {errorUserDetail && <Error error={errorUserDetail} />}
      {errorUserUpdated && (
        <Error title={'Error Updating User'} error={errorUserUpdated} />
      )}

      {loadingState && <Loader />}
      <form onSubmit={updateUserHandler}>
        <Box className={'header header-border'}>
          <Box className={'header-left'}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Typography classes={{ root: 'back' }} onClick={handleGoBack}>
                <ArrowBackIcon classes={{ root: 'back-icon' }} />
                Back
              </Typography>
              <Typography variant="h5" component="h5">
                Edit ({userDetail?.name})
              </Typography>
            </Stack>
          </Box>
          <Box className={'header-right'}>
            <Button
              onClick={handleGoBack}
              type="submit"
              variant="contained"
              color="info"
            >
              Cancel
            </Button>
          </Box>
          <Box className={'header-right'}>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: 'save-btn' }}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Avatar
                alt="Remy Sharp"
                src={
                  !image
                    ? `/uploads/${formData?.image?.split('/')[3]}`
                    : `/uploads/${image?.split('/')[3]}`
                }
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '5px',
                }}
              />
              {/* <img
                src={
                  formData?.image
                    ? `/uploads/${formData?.image?.split('/')[3]}`
                    : imgUrl
                }
                className={'profile-img'}
                alt="organization_logo"
              /> */}
            </Grid>
            <Grid item xs={3.5}>
              <Typography>Admin's Picture</Typography>
              <Typography classes={{ root: 'caption' }}>
                Upload a high-res picture in which face is clear.
              </Typography>
            </Grid>
            <Grid item xs={7.5}>
              <input
                hidden
                accept="image/*"
                type="file"
                id="select-image"
                // className={'input-img'}
                name="image"
                onChange={handleChange}
              />
              <label htmlFor="select-image">
                <Button
                  component="span"
                  variant="contained"
                  startIcon={
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                  }
                >
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Full Name"
                id="name"
                size="small"
                value={formData.name}
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Email Address</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Email Address"
                id="email"
                value={formData.email}
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Organization</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="organization"
                select
                label="Select Organization"
                required
                classes={{ root: 'input-width' }}
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
              >
                {organizations?.map((organization) => (
                  <MenuItem key={organization.id} value={organization.id}>
                    {organization.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box> */}

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Contact Number</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Contact Number"
                id="phone"
                value={formData.phone}
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* <Box className={'box-spacing'}>
          <Typography variant="h5">Credentials</Typography>
          <Typography classes={{ root: 'caption' }}>
            Below are one-time created credentials. These will be sent to
            mentioned email.
          </Typography>
        </Box> */}

        {/* <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Email Address</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Email Adress"
                id="email"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box> */}

        {/* <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Password</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                label="Password"
                id="password"
                size="small"
                classes={{ root: 'input-width' }}
              />
            </Grid>
          </Grid>
        </Box> */}
      </form>
    </CardContainer>
  );
};

export default AdminEditPage;
