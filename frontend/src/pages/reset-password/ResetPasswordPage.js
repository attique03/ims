import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, resetPasswordUser } from '../../redux/actions/user/userActions';
import CardContainer from '../../components/card/CardContainer';
import { USER_RESET_PASSWORD_RESET } from '../../redux/constants/user/userConstants';
import { Alert, AlertTitle } from '@mui/material';
// import './login.css';

const theme = createTheme({
  typography: {
    caption: {
      //   color: "#BCBCBC",
      color: '#A9A9A9',
    },
  },
  card: {
    borderRadius: '20px',
  },
});

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { error, user, success } = userResetPassword;

  useEffect(() => {
    if (user && success) {
      console.log('iNFO ', user);
      dispatch({ type: USER_RESET_PASSWORD_RESET });
      navigate('/login');
    }
  }, [dispatch, user, navigate, success]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      const email = localStorage.getItem('ResetEmail')
        ? JSON.parse(localStorage.getItem('ResetEmail'))
        : null;

      localStorage.removeItem('ResetEmail');

      dispatch(resetPasswordUser(email, password));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: '100px', height: '100px' }}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardContainer minWid={400}>
            {message && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
              </Alert>
            )}
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Enter your new password
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="reset-password"
                label="Confirm Password"
                type="password"
                id="re-password"
                // autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#31DE79' }}
              >
                Reset Password
              </Button>
            </Box>
          </CardContainer>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption">
            Forgot your Password?
            <Link to={'/forgot-password'} className="reset-link">
              {' '}
              Reset Password
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
