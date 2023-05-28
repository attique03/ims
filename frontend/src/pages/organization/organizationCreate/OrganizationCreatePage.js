import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import './organizationCreate.css';
import axiosConfig from '../../../utils/axiosConfig';
import { createOrganization } from '../../../redux/actions/organization/organizationActions';
import { ORGANIZATION_CREATE_RESET } from '../../../redux/constants//organization/organizationConstants';
import Loader from '../../../components/loader/Loader';
import axios from 'axios';
import Error from '../../../components/error/Error';

const countries = [
  {
    value: 'Pakistan',
    label: 'Pakistan',
  },
  {
    value: 'United States',
    label: 'United States',
  },
];

const OrganizationCreatePage = () => {
  const [userData, setUserData] = useState([
    { id: 1, label: 'Name of the Orgnization', value: '' },
    { id: 2, label: 'Bio', value: '' },
  ]);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const organizationCreate = useSelector((state) => state.organizationCreate);
  const { error, success } = organizationCreate;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    // dispatch({ type: ORGANIZATION_CREATE_RESET });

    if (image) {
      setFormData({
        ...formData,
        image: image,
      });
    }

    if (success) {
      dispatch({ type: ORGANIZATION_CREATE_RESET });
      navigate('/organizations');
    }
  }, [success, dispatch, navigate, image]);

  const createOrgnizationHandler = (e) => {
    e.preventDefault();

    dispatch(createOrganization(formData));
  };

  const goBackHandler = () => {
    navigate('/organizations');
  };

  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //     const { data } = axiosConfig.post('/complaints/upload', selectedImage);
  //     console.log('Daata ', data);
  //   }
  // }, [selectedImage]);

  const handleFiles = (files) => {
    // setImage(files[0]);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const config = {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    };

    //   .then((response) => response.json())
    //   .then((data) => console.log('Fetch ', data))
    //   .catch((error) => console.error('Error ', error));

    const { data } = await axios.post(
      // '/upload',
      // `${axiosConfig.defaults.baseURL}/upload`,
      'http://127.0.0.1:4000/upload',
      formData,
      // config,
    );

    if (data) {
      setImage(data);
      setFormData({
        ...formData,
        image: data,
      });
    }
  };

  console.log('Form Data ', formData);

  return (
    <>
      {loadingState && <Loader />}
      <Container className={'wrapper'}>
        <Card className={'card'}>
          <Box sx={{ m: 1, p: 1 }}>
            {error && (
              <Error title={'Error Creating Organization'} error={error} />
            )}
          </Box>
          <form
            onSubmit={createOrgnizationHandler}
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
                    Add New Organization
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
                  // onClick={createOrgnizationHandler}
                >
                  Save
                </Button>
              </Box>
            </Box>

            <Box sx={{ p: 1, m: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  {/* <Avatar
                    alt="Remy Sharp"
                    src={'/uploads/' + image.split('/')[3]}
                  /> */}
                  <img
                    // src={'/uploads/ux.png'}
                    src={
                      image
                        ? `/uploads/${image?.split('/')[3]}`
                        : 'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png'
                    }
                    style={{ width: '70px', height: '70px' }}
                    alt="logo"
                  />
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
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     image: URL.createObjectURL(e.target.files[0]),
                    //   })
                    // }
                    onChange={async (e) => {
                      e.preventDefault();
                      const file = e.target.files[0];
                      const formData2 = new FormData();
                      formData2.append('image', file);

                      const { data } = await axios.post(
                        'http://127.0.0.1:4000/upload',
                        formData2,
                      );

                      if (data) {
                        setImage(data);
                        // setFormData({
                        //   ...formData,
                        //   image: data,
                        // });
                      }
                    }}
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
                    label="Name of Organization"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: '400px' }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
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
                  <Typography sx={{ mt: 1 }}>Email Address</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    label="Email Address"
                    id="outlined-size-small"
                    defaultValue=""
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
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
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
                    label="Address"
                    id="outlined-size-small"
                    defaultValue=""
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
                    label="City"
                    id="outlined-size-small"
                    defaultValue=""
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
                    id="outlined-select-country"
                    select
                    label="Select Country"
                    defaultValue="Pakistan"
                    sx={{ width: '400px' }}
                    size="small"
                    // helperText="Select Country"
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
                    label="Zip Code"
                    id="outlined-size-small"
                    defaultValue=""
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
                    label="Representative Name"
                    id="outlined-size-small"
                    defaultValue=""
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
                    label="Representative Contact No."
                    id="outlined-size-small"
                    defaultValue=""
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

            <Box
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
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default OrganizationCreatePage;
