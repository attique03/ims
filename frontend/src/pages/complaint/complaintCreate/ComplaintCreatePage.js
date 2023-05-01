import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import CardContainer from '../../../components/card/CardContainer';
import { COMPLAINT_CREATE_RESET } from '../../../redux/constants/complaint/complaintConstants';
import { createComplaint } from '../../../redux/actions/complaint/complaintActions';
import { ADMIN } from '../../../utils/constants';

const ComplaintCreatePage = () => {
  const [formData, setFormData] = useState({
    title: null,
    description: '',
    image: 'frontend/public/uploads/image-1682844629823.jpg',
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const complaintCreate = useSelector((state) => state.complaintCreate);
  const { complaint, error } = complaintCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { error: errorUserInfo, userInfo } = userLogin;

  useEffect(() => {
    if (complaint?.id) {
      dispatch({ type: COMPLAINT_CREATE_RESET });
      navigate('/complaints');
    }
  }, [complaint?.id, dispatch, navigate]);

  const handleChange = async (event) => {
    event.preventDefault(); // prevent the default behavior of form submission

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post(
        'http://127.0.0.1:4000/upload',
        formData,
      );

      if (data) {
        setImage(data);
        setFormData({
          ...formData,
          image: data,
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error here, e.g. show an error message to the user
    }

    return false; // prevent any other event listeners from firing
  };

  const createComplaintHandler = (e) => {
    e.preventDefault();
    dispatch(createComplaint(formData));
  };

  const goBackHandler = () => {
    navigate('/complaints');
  };

  console.log('Image ', image);

  return (
    <CardContainer>
      <form onSubmit={createComplaintHandler}>
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
                Add New Complaint
              </Typography>
            </Stack>
          </Box>
          <Box p={1}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#31DE79' }}
            >
              Submit Complaint
            </Button>
          </Box>
        </Box>

        {userInfo?.user?.role?.role !== ADMIN && (
          <Box sx={{ p: 1, m: 1 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ mt: 1 }}>
                  <b>Title</b>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  label="Enter Title"
                  id="outlined-size-small"
                  defaultValue=""
                  size="small"
                  sx={{ width: '400px' }}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ p: 1, m: 1, pb: 3 }}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Description</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="outlined-multiline-static"
                label="Enter Description Here"
                multiline
                rows={4}
                // defaultValue="Default Value"
                sx={{ width: '400px' }}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ p: 1, m: 1, pb: 3 }}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }}>
                <b>Image</b>
              </Typography>
            </Grid>

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
            <Grid item xs={8}>
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
      </form>
    </CardContainer>
  );
};

export default ComplaintCreatePage;
