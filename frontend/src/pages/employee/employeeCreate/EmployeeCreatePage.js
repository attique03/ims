import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
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
import { USER_CREATE_RESET } from '../../../redux/constants/user/userConstants';
import { createUser } from '../../../redux/actions/user/userActions';
import './adminCreate.css';
import axios from 'axios';
import CardContainer from '../../../components/card/CardContainer';
import Error from '../../../components/error/Error';
import { listDepartments } from '../../../redux/actions/department/departmentActions';

const EmployeeCreatePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    email: '',
    password: '',
    phone: '',
    organization: userInfo?.user?.organization?.id,
    department: null,
    designation: null,
    education: null,
    companyExperience: null,
    totalExperience: null,
  });
  const [image, setImage] = useState('');
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUrl =
    'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png';

  const userCreate = useSelector((state) => state.userCreate);
  const { user, error } = userCreate;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments, error: errorDepartmentList } = departmentList;

  const imgCheck = !image;

  useEffect(() => {
    dispatch(listDepartments());
    if (user?.id) {
      dispatch({ type: USER_CREATE_RESET });
      navigate('/employees');
    }
  }, [user?.id, dispatch, navigate]);

  const createUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(formData, email));
  };

  // const handleChange = async (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   const formData2 = new FormData();
  //   formData2.append('image', file);

  //   const apiURL = 'http://127.0.0.1:4000/upload';

  //   try {
  //     const { data } = await axios.post(apiURL, formData2);

  //     if (data) {
  //       setImage(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData2 = new FormData();
    formData2.append('image', file);

    const { data } = await axios.post(
      'http://127.0.0.1:4000/upload',
      formData2,
    );

    if (data) {
      setFormData({
        ...formData,
        image: data,
      });
    }
  };

  const handleGoBack = () => {
    navigate('/employees');
  };

  console.log('Image ====> ', formData);

  return (
    <CardContainer>
      {error && <Error error={error} />}
      {errorDepartmentList && (
        <Error
          title={'Error Departments Fetching'}
          error={errorDepartmentList}
        />
      )}

      {/* <form onSubmit={createUserHandler}> */}
      <Box component="form" onSubmit={createUserHandler} id="vendor-form">
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
                Add New Employee
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
              // onClick={createUserHandler}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <img
                src={
                  formData?.image
                    ? `/uploads/${formData?.image?.split('/')[3]}`
                    : imgUrl
                }
                className={'profile-img'}
                alt="organization_logo"
              />
            </Grid>
            <Grid item xs={3.5}>
              <Typography>Employee's Picture</Typography>
              <Typography classes={{ root: 'caption' }}>
                Upload a high-res picture in which face is clear.
              </Typography>
            </Grid>
            <Grid item xs={7.5}>
              <input
                accept="image/*"
                type="file"
                hidden
                id="select-image"
                // style={{ display: 'none' }}
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
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Department</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="department"
                select
                label="Select Department"
                required
                classes={{ root: 'input-width' }}
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <MenuItem value=""></MenuItem>
                {departments &&
                  departments?.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Contact Number</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Contact Number"
                id="phone"
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

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Designation</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Designation"
                id="designation"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designation: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Education</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Education"
                id="education"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Company Experience</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Company Experience"
                id="education"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyExperience: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>Total Experience</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Total Experience"
                id="education"
                size="small"
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalExperience: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 5 }} />

        <Box className={'box-spacing'}>
          <Typography variant="h5">Credentials</Typography>
          <Typography classes={{ root: 'caption' }}>
            Below are one-time created credentials. These will be sent to
            mentioned email.
          </Typography>
        </Box>

        <Box className={'box-spacing'}>
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
        </Box>

        <Box className={'box-spacing'}>
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
        </Box>
      </Box>
      {/* </form> */}
    </CardContainer>
  );
};

export default EmployeeCreatePage;
