import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/actions/user/userActions';
import {
  Admin,
  adminPages,
  employeePages,
  settings,
  SuperAdmin,
  superAdminPages,
} from './navbarData/navbarData';
import { ADMIN, EMPLOYEE, SUPERADMIN } from '../../utils/constants';
import './navbar.css';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedNav, setSelectedNav] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('dslkfjd', location.pathname.split('/')[1]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleOpenNavMenu = (event) => {
    setShowNavbar(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setUserProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setShowNavbar(null);
  };

  const handleCloseUserMenu = () => {
    setUserProfile(null);
  };

  const handleSelectedNav = (index) => {
    setSelectedNav(index);
  };

  function checkUser(userRole) {
    switch (userRole) {
      case SUPERADMIN:
        return superAdminPages;
      case ADMIN:
        return adminPages;
      case EMPLOYEE:
        return employeePages;
      default:
        return null;
    }
  }

  function checkRole(role) {
    switch (role) {
      case SUPERADMIN:
        return SuperAdmin;
      case ADMIN:
        return Admin;
      case EMPLOYEE:
        return userInfo?.user?.name;
      default:
        return null;
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src="/logo.png" alt="logo" className="logo-nav" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="hamburger-menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={showNavbar}
              open={Boolean(showNavbar)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {userInfo &&
                checkUser(userInfo?.user?.role?.role).map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link to={page.route}>{page.title}</Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src="/logo.png" alt="logo" className="logo-sm" />
          </Box>
          <Typography
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userInfo &&
              checkUser(userInfo?.user?.role?.role).map((page, index) => (
                <Link
                  key={index}
                  to={page.route}
                  // onClick={() => handleSelectedNav(index)}
                  className={`nav-link ${
                    location.pathname.split('/')[1] === page.route.split('/')[1]
                      ? 'active'
                      : ''
                  }`}

                  // className={`nav-link ${
                  //   selectedNav === index ? 'active' : ''
                  // }`}
                  // className={(selectedNav === index && 'active', 'nav-link')}
                >
                  {page.title}
                </Link>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu}>
                {userInfo?.user?.image?.split ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={`/uploads/${userInfo?.user?.image?.split('/')[3]}`}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: '#c62828' }}>
                    {userInfo?.user?.name[0]}
                  </Avatar>
                )}

                {/* <Avatar alt="Remy Sharp" src={"/avatar0.jpg"} /> */}

                <Typography sx={{ mx: 1, color: 'black' }}>
                  {checkRole(userInfo?.user?.role?.role)}
                </Typography>

                <FontAwesomeIcon icon={faChevronDown} className="fa-light" />
                {userInfo?.user?.organization?.name && (
                  <Typography
                    sx={{ ml: 1 }}
                    variant="caption"
                    component="caption"
                  >
                    {userInfo?.user?.organization?.name}
                  </Typography>
                )}
              </IconButton>
            </Tooltip>

            <Menu
              classes={{ root: 'menu' }}
              id="menu-appbar"
              anchorEl={userProfile}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userProfile)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={logoutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
