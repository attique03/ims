import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
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
    image: '',
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const complaintCreate = useSelector((state) => state.complaintCreate);
  const { complaint, error } = complaintCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (image) {
      setFormData({
        ...formData,
        image: image,
      });
    }

    if (complaint?.id) {
      dispatch({ type: COMPLAINT_CREATE_RESET });
      navigate('/complaints');
    }
  }, [complaint?.id, dispatch, navigate, image]);

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
        // setFormData({
        //   ...formData,
        //   image: data,
        // });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    return false; // prevent any other event listeners from firing
  };

  const createComplaintHandler = (e) => {
    e.preventDefault();
    dispatch(createComplaint(formData));
  };

  const handleGoBack = () => {
    navigate('/complaints');
  };

  console.log('Form Data ', formData);

  return (
    <CardContainer>
      <form onSubmit={createComplaintHandler}>
        <Box className={'header'}>
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
                Add New Complaint
              </Typography>
            </Stack>
          </Box>
          <Box className={'header-right'}>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: 'save-btn' }}
            >
              Submit Complaint
            </Button>
          </Box>
        </Box>

        <Divider />

        {userInfo?.user?.role?.role !== ADMIN && (
          <Box className={'box-spacing'}>
            <Grid container>
              <Grid item xs={3}>
                <Typography sx={{ mt: 1 }}>
                  <b>Title</b>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  label="Enter Title"
                  id="title"
                  size="small"
                  classes={{ root: 'input-width' }}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }} variant="b" component="b">
                Description
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="description"
                label="Enter Description Here"
                multiline
                rows={4}
                classes={{ root: 'input-width' }}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box className={'box-spacing'}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ mt: 1 }} variant="b" component="b">
                Image
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <img
                src={
                  image
                    ? `/uploads/${image?.split('/')[3]}`
                    : 'https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png'
                }
                className={'profile-img'}
                alt="logo"
              />
            </Grid>
            <Grid item xs={8}>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                className="input-hide"
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
                    <FontAwesomeIcon icon={faUpload} className={'icon-size'} />
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
