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
import ReactFileReader from 'react-file-reader';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from '@mui/styles/makeStyles';

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: '#f00',
//     color: '#fff',
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

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
  // const classes = useStyles();

  const handleFiles = (files) => {
    console.log(files);
  };

  return (
    <Container style={{ maxWidth: '1200px', mb: 3 }}>
      <Card sx={{ borderRadius: '15px', boxShadow: 3, my: 5 }}>
        <Box style={{ width: '100%', borderBottom: '1px solid #E0E0E0' }}>
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
                // sx={{ mt: 3, mb: 2, backgroundColor: "#31DE79" }}
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          {/* <ReactFileReader handleFiles={handleFiles}> */}
          <img
            src="https://www.sourcedogg.com/wp-content/uploads/2015/05/default-placeholder.png"
            style={{ width: '50px', height: '50px' }}
            alt="organization"
          />
          {/* <button className="btn">Upload</button> */}
          {/* </ReactFileReader> */}
          <Box
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // p: 1,
              ml: 2,
              // bgcolor: 'background.paper',
              // borderRadius: 1,
              height: '30px',
            }}
          >
            {/* <h3>Organization Logo</h3> */}
            <Typography>Organization Logo</Typography>
            <Typography>Upload File</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              ml: 3,
            }}
            startIcon={
              <FontAwesomeIcon icon={faUpload} style={{ height: '13px' }} />
            }
          >
            Upload
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Name of Organization</Typography>
          <div style={{ marginLeft: '3rem' }}>
            <TextField
              label="Name of Organization"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Email Address</Typography>
          <div style={{ marginLeft: '6.3rem' }}>
            <TextField
              label="Email Address"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          <Typography sx={{ mt: 1 }}>Bio</Typography>
          <div style={{ marginLeft: '11.5rem' }}>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              sx={{ width: '400px' }}
            />
          </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          <Typography sx={{ mt: 1 }}>Address</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 1,
              ml: 17,
              bgcolor: 'background.paper',
            }}
          >
            <TextField
              label="Address"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ mb: 2, width: '400px' }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              sx={{ mb: 2 }}
              // helperText="Please select your currency"
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Zip Code"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ mb: 2 }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Representative Name</Typography>
          <div style={{ marginLeft: '3rem' }}>
            <TextField
              label="Representative Name"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Representative Contact No.</Typography>
          <div style={{ marginLeft: '3rem' }}>
            <TextField
              label="Representative Contact No."
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </div>
        </Box>

        <Box
          sx={{
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Email Address</Typography>
          <Box style={{ marginLeft: '6.3rem' }}>
            <TextField
              label="Email Address"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ mt: 1 }}>Password</Typography>
          <Box style={{ marginLeft: '6.3rem', justifyContent: 'center' }}>
            <TextField
              label="Password"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              sx={{ width: '400px' }}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default OrganizationCreatePage;
