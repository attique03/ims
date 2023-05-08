import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Avatar, createTheme, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import Container from '@mui/material/Container';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const theme = createTheme({
  typography: {
    caption: {
      color: '#A9A9A9',
    },
  },
  card: {
    borderRadius: '20px',
  },
});

export default function DashboardSummary() {
  return (
    <ThemeProvider theme={theme}>
      {/* <div style={{ width: "100%" }}> */}
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRight: '1px solid #A9A9A9',
            }}
          >
            <Typography component="b" variant="span">
              Employees
            </Typography>
            <Typography component="h1" variant="h5">
              500{' '}
              <FontAwesomeIcon icon={faCaretUp} style={{ color: '#31DE79' }} />
            </Typography>
            <Typography variant="caption" display="block">
              25 new Employee added this month
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              // borderRadius: 1,
              borderRight: '1px solid grey',
            }}
          >
            <Typography component="b" variant="span">
              Inventory Items
            </Typography>
            <Typography component="h1" variant="h5">
              500{' '}
              <FontAwesomeIcon icon={faCaretUp} style={{ color: '#31DE79' }} />
            </Typography>
            <Typography variant="caption" display="block">
              50 new items added this month
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              // borderRadius: 1,
              borderRight: '1px solid grey',
            }}
          >
            <Typography component="b" variant="span">
              Vendors
            </Typography>
            <Typography component="h1" variant="h5">
              25 <FontAwesomeIcon icon={faCaretUp} style={{ color: 'red' }} />
            </Typography>
            <Typography variant="caption" display="block">
              2 New Vendors added this month
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Typography component="b" variant="span">
              Categories
            </Typography>
            <Typography component="h1" variant="h5">
              15,000{' '}
              <FontAwesomeIcon icon={faCaretUp} style={{ color: '#31DE79' }} />
            </Typography>
            <Typography variant="caption" display="block">
              1 New Category added this month
            </Typography>
          </Box>
        </Box>
      </Container>
      {/* </div> */}
    </ThemeProvider>
  );
}
