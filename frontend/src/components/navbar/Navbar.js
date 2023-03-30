import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// const pages = ["Dashboard", "Organizations", "Admins", "Complaints"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const superAdminPages = [
  { title: 'Dashboard', route: '/' },
  { title: 'Organizations', route: '/organizations' },
  { title: 'Admins', route: '/admin' },
  { title: 'Complaints', route: '/complaints' },
];

const adminPages = [
  { title: 'Dashboard', route: '/' },
  { title: 'Inventory', route: '/inventory' },
  { title: 'Categories', route: '/categories' },
  { title: 'Employees', route: '/employees' },
  { title: 'Requests', route: '/requests' },
  { title: 'Returns', route: '/returns' },
  { title: 'Complaints', route: '/complaints' },
  { title: 'Vendors', route: '/vendors' },
];

const employeePages = [
  { title: 'Dashboard', route: '/' },
  { title: 'Requests', route: '/requests' },
  { title: 'Complaints', route: '/complaints' },
];

// .css-1q39md6-MuiButtonBase-root-MuiButton-root  navbar items color
// .css-hip9hq-MuiPaper-root-MuiAppBar-root navbar background

function Navbar() {
  const [user, setUser] = useState('superadmin');
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function checkUser(userRole) {
    switch (userRole) {
      case 'superadmin':
        return superAdminPages;
      case 'admin':
        return adminPages;
      case 'employee':
        return employeePages;
      default:
        return null;
    }
    // return userRole === 'superadmin'
    //   ? superAdminPages
    //   : userRole === 'admin'
    //   ? adminPages
    //   : employeePages;
  }

  return (
    <AppBar
      classes={{ root: 'navcolor' }}
      color="transparent"
      position="static"
      sx={{ marginBottom: '25px' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: '40px', height: '40px' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {checkUser('admin').map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link textAlign="center" to={page.route}>
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: '30px', height: '30px' }}
            />
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {checkUser('employee').map((page, index) => (
              <Link
                textAlign="center"
                to={page.route}
                onClick={handleCloseNavMenu}
                style={{
                  margin: '2px 5px 2px 5px',
                  color: 'black',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {page.title}
              </Link>

              //   <Button
              //     key={index}
              //     onClick={handleCloseNavMenu}
              //     sx={{ my: 2, color: "white", display: "block" }}
              //   >
              //     {page.title}
              //   </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/avatar0.jpg" />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
