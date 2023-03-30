import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ReactFileReader from 'react-file-reader';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faCaretUp,
  faSearch,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomizedTables from '../../components/table/table';
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

const tableColumns = [
  'ID',
  'Image',
  'Name',
  'Location',
  'Email',
  'Contact No.',
  'Action',
];
const tableRows = [
  {
    id: '19023867',
    image: '/logo.png',
    name: 'Alpha',
    location: 'Lahore, Pakistan',
    email: 'info@alpha.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
  {
    id: '203928409',
    image: '/logo.png',
    name: 'Beta',
    location: 'Lahore, Pakistan',
    email: 'info@beta.com',
    contact: '0300-0000000',
    action: 'View',
  },
];

const OrganizationListPage = () => {
  // const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleFiles = (files) => {
    console.log(files);
  };

  return (
    <Container style={{ maxWidth: '1000px', mb: 3 }}>
      <Card sx={{ borderRadius: '15px' }}>
        <Box display="flex" p={1} sx={{ mb: 4 }}>
          <Box p={1} flexGrow={1}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5" component="h5">
                Organizations
              </Typography>
              <TextField
                label="Search"
                id="outlined-size-small"
                defaultValue=""
                size="small"
                sx={{ width: '200px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ height: '13px' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-select-small">Age</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
              }
              sx={{ backgroundColor: '#31DE79' }}
            >
              Add
            </Button>
          </Box>
        </Box>

        <Box sx={{ m: 2 }}>
          <CustomizedTables columns={tableColumns} data={tableRows} />
        </Box>
      </Card>
    </Container>
  );
};

export default OrganizationListPage;
