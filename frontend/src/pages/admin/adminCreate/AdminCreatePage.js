import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
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
import axiosConfig from '../../../utils/axiosConfig';
import { listOrganizations } from '../../../redux/actions/organizationActions';
import Loader from '../../../components/loader/Loader';
import { USER_CREATE_RESET } from '../../../redux/constants/userConstants';
import { createUser } from '../../../redux/actions/userActions';
import './adminCreate.css';

const AdminCreatePage = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    organization: 0,
  });
  const [email, setEmail] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCreate = useSelector((state) => state.userCreate);
  const { user, error } = userCreate;

  const organizationList = useSelector((state) => state.organizationList);
  const { organizations, error: errorOrganizationList } = organizationList;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  useEffect(() => {
    dispatch(listOrganizations());
    if (user?.id) {
      dispatch({ type: USER_CREATE_RESET });
      navigate('/admins');
    }
  }, [user?.id, dispatch, navigate]);

  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(formData, email));
  };

  const goBackHandler = () => {
    navigate('/admins');
  };

  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //     const { data } = axiosConfig.post('/complaints/upload', selectedImage);
  //     console.log('Daata ', data);
  //   }
  // }, [selectedImage]);

  // const handleFiles = (files) => {
  //   console.log(files[0]);
  //   setImage(files[0]);
  // };

  // const handleChange = async (e) => {
  //   // setImageUrl(URL.createObjectURL(e));

  //   const file = e.target.files[0];
  //   console.log('File  ===> ', file);

  //   const formData = new FormData();

  //   formData.append('image', e.target.files[0]);
  //   console.log('Form Data ==> ', formData.get('image'));

  //   const config = {
  //     header: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   const { data } = await axiosConfig.post(
  //     '/complaints/upload',
  //     {
  //       fieldname: 'file',
  //       originalname: 'AMS ERD.jpg',
  //       encoding: '7bit',
  //       mimetype: 'image/jpeg',
  //       destination: './uploads',
  //       filename: 'AMSERD24e6374b-ab67-4d03-a235-62c08d6ed8a5.jpg',
  //       path: 'uploads/AMSERD24e6374b-ab67-4d03-a235-62c08d6ed8a5.jpg',
  //       size: 75761,
  //     },
  //     // { file: formData.get('image') },
  //     config,
  //   );
  //   console.log('Daata ', data);
  // };

  // console.log('Selected Image ', selectedImage);

  return (
    <Container className={'wrapper'}>
      <Card className={'card'}>
        <form onSubmit={createUserHandler}>
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
                  sx={{}}
                  onClick={goBackHandler}
                >
                  <ArrowBackIcon sx={{ height: '15px', mt: 0.2 }} />
                  Back
                </Typography>
                <Typography variant="h5" component="h5">
                  Add New Admin
                </Typography>
              </Stack>
            </Box>
            <Box p={1}>
              <Button type="submit" fullWidth variant="contained" color="info">
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
                <img
                  src={
                    formData?.image
                      ? formData?.image
                      : 'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png'
                  }
                  style={{ width: '70px', height: '70px' }}
                  alt="organization_logo"
                />
              </Grid>
              <Grid item xs={3.5}>
                <Typography>Admin's Picture</Typography>
                <Typography variant="caption">
                  Upload a high-res picture in which face is clear.
                </Typography>
              </Grid>
              <Grid item xs={7.5}>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: 'none' }}
                  name="image"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                  // onChange={handleChange}
                  // onChange={(e) => setSelectedImage(e.target.files[0])}
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
                <Typography sx={{ mt: 1 }}>Name</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  label="Full Name"
                  id="outlined-size-small"
                  defaultValue=""
                  size="small"
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ mt: 1 }}>Organization</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-select-country"
                  select
                  label="Select Organization"
                  required
                  // defaultValue=""
                  sx={{ width: '400px' }}
                  size="small"
                  // helperText="Select Country"
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
          </Box>

          <Box sx={{ p: 1, m: 1, pb: 3, borderBottom: '1px solid #E0E0E0' }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ mt: 1 }}>Contact Number</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  label="Contact Number"
                  id="outlined-size-small"
                  defaultValue=""
                  size="small"
                  sx={{ width: '400px' }}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
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
  );
};

export default AdminCreatePage;
