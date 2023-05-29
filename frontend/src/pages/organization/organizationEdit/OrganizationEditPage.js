import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Grid from '@mui/material/Grid';
import {
  createOrganization,
  listOrganizationDetails,
  updateOrganization,
} from '../../../redux/actions/organization/organizationActions';
import {
  ORGANIZATION_CREATE_RESET,
  ORGANIZATION_UPDATE_RESET,
} from '../../../redux/constants//organization/organizationConstants';
import Loader from '../../../components/loader/Loader';
import axios from 'axios';
import Error from '../../../components/error/Error';

const countries = [
  {
    value: 'Pakistan',
    label: 'Pakistan',
  },
  {
    value: 'United Kingdom',
    label: 'United Kingdom',
  },
  {
    value: 'United States',
    label: 'United States',
  },
  {
    value: 'China',
    label: 'China',
  },
];

const OrganizationEditPage = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    bio: '',
    address: '',
    city: '',
    country: '',
    zip: 0,
    representativeName: '',
    representativeContact: '',
  });
  const [image, setImage] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const organizationDetails = useSelector((state) => state.organizationDetails);
  const { organization, error } = organizationDetails;

  const organizationUpdate = useSelector((state) => state.organizationUpdate);
  const {
    organization: organizationUpdated,
    success,
    error: errorOrgnizationUpdated,
  } = organizationUpdate;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    if (image) {
      // console.log('Here in Image');
      setFormData({
        ...formData,
        image: image,
      });

      // console.log('Here in Image 2', formData);
    }

    if (organizationUpdated?.id && success) {
      dispatch({ type: ORGANIZATION_UPDATE_RESET });
      navigate('/organizations');
    } else {
      if (!organization.name || !organization.id) {
        // console.log('Inside If, Dispatching ');

        dispatch(listOrganizationDetails(params.id));
      } else {
        console.log('Inside Else Setting Form ', formData);
        setFormData({
          image: organization.image,
          name: organization.name,
          email: organization.email,
          bio: organization.bio,
          address: organization.address,
          city: organization.city,
          country: organization.country,
          zip: organization.zip,
          representativeName: organization.representativeName,
          representativeContact: organization.representativeContact,
        });
      }
    }
  }, [
    dispatch,
    success,
    navigate,
    params.id,
    // organization,
    organizationUpdated,
    image,
  ]);

  const updateOrgnizationHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateOrganization(params.id, {
        ...formData,
        image: image ? image : formData.image,
      }),
    );
  };

  const goBackHandler = () => {
    navigate('/organizations');
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

  console.log('Form Data ', { ...formData, image: image }, image);

  return (
    <>
      {error && <Error error={error} />}
      {errorOrgnizationUpdated && <Error error={errorOrgnizationUpdated} />}

      {loadingState && <Loader />}
      <Container className={'wrapper'}>
        <Card className={'card'}>
          <Box sx={{ m: 1, p: 1 }}>
            {/* {error && (
              <Error title={'Error Creating Organization'} error={error} />
            )} */}
          </Box>
          <form
            onSubmit={updateOrgnizationHandler}
            // encType="multipart/form-data"
          >
            <Box display="flex" p={1} className={'border-card'}>
              <Box p={1} flexGrow={1}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <Typography
                    classes={{ root: 'title' }}
                    component="caption"
                    variant="caption"
                    onClick={goBackHandler}
                  >
                    <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                    Back
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Edit Organization
                  </Typography>
                </Stack>
              </Box>
              <Box p={1}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="info"
                >
                  Cancel
                </Button>
              </Box>
              <Box p={1}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#31DE79' }}
                >
                  Save
                </Button>
              </Box>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
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
                    // src={'/uploads/ux.png'}
                    src={
                      image
                        ? `/uploads/${image?.split('/')[3]}`
                        : 'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png'
                    }
                    style={{ width: '70px', height: '70px' }}
                    alt="logo"
                  /> */}
                </Grid>
                <Grid item xs={3.5}>
                  <Typography>Organization Logo</Typography>
                  <Typography variant="caption">
                    Upload Logo with minimum resolution of 800x800px
                  </Typography>
                </Grid>
                <Grid item xs={7.5}>
                  <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{ display: 'none' }}
                    name="image"
                    onChange={handleChange}
                  />
                  <label htmlFor="select-image">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        ml: 3,
                      }}
                      startIcon={
                        <FontAwesomeIcon
                          icon={faUpload}
                          style={{ height: '13px' }}
                        />
                      }
                    >
                      Upload
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Name of Organization</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    // label="Name of Organization"
                    id="name"
                    value={formData.name}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        // image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Email Address</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="email"
                    value={formData.email}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1, pb: 3, borderBottom: '1px solid #E0E0E0' }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Bio</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bio: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1, pb: 3, borderBottom: '1px solid #E0E0E0' }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 0 }}
              >
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Address</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="address"
                    value={formData.address}
                    size="small"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                        image: image,
                      })
                    }
                    sx={{ width: '400px' }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    id="city"
                    value={formData.city}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    id="country"
                    select
                    value={formData.country}
                    sx={{ width: '400px' }}
                    size="small"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        country: e.target.value,
                        image: image,
                      })
                    }
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    id="zip"
                    value={formData.zip}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        zip: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Representative Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="rep-name"
                    value={formData.representativeName}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representativeName: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Representative Contact</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="rep-contact"
                    value={formData.representativeContact}
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representativeContact: e.target.value,
                        image: image,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* <Box
              sx={{
                p: 1,
                m: 1,
                mt: 5,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Credentials
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Below are one-time created credentials. These will be sent to
                mentioned email.
              </Typography>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Email Address</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    label="Email Address"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: '400px' }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 1, m: 1, mb: 4 }}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 1 }}>Password</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    label="Password"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: '400px' }}
                  />
                </Grid>
              </Grid>
            </Box> */}
          </form>
        </Card>
      </Container>
    </>
  );
};

export default OrganizationEditPage;
