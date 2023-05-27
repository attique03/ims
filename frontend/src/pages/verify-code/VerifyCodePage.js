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
import { login } from '../../redux/actions/user/userActions';
import CardContainer from '../../components/card/CardContainer';
// import './forgotPassword.css';
import { verifyPasswordResetToken } from '../../redux/actions/passwordResetToken/passwordResetTokenActions';
import {
  PASSWORD_RESET_TOKEN_CREATE_RESET,
  PASSWORD_RESET_TOKEN_VERIFY_RESET,
} from '../../redux/constants/password-reset/passwordResetConstants';
import { Alert, AlertTitle } from '@mui/material';

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

export default function VerifyCodePage() {
  const [code, setCode] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordResetTokenVerify = useSelector(
    (state) => state.passwordResetTokenVerify,
  );
  const { error, tokenVerify } = passwordResetTokenVerify;

  useEffect(() => {
    if (tokenVerify?.message === 'success') {
      dispatch({ type: PASSWORD_RESET_TOKEN_VERIFY_RESET });
      navigate('/reset-password');
    }
  }, [dispatch, navigate, tokenVerify]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = JSON.parse(localStorage.getItem('ResetEmail'));

    dispatch(verifyPasswordResetToken(code, email));
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
            {tokenVerify?.message && tokenVerify?.message !== 'success' && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {tokenVerify?.message}
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
                Verification Code
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{
                  mx: 0,
                  width: '205px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                Enter verification code sent to your email to continue
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
                id="verificationCode"
                label="Enter Verification Code "
                name="verificationCode"
                autoFocus
                sx={{ padding: '0px 0px' }}
                onChange={(e) => setCode(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#31DE79' }}
              >
                Continue
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="caption">Resend Code (25 Sec)</Typography>
            </Box>
          </CardContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
