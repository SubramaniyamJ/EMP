import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { AccountCircle } from '@mui/icons-material';
import './styles/adminDashboard.css';

const Admindashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile Setting</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="dashboard-container">
        <Box py={5}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" className="section-title">
            Admin Actions
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="action-card">
                  <CardContent style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <Typography variant="h5" component="h3">
                      Add Teachers
                    </Typography>
                    <Button variant="contained" color="secondary" className="action-button">
                      Go
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="action-card">
                  <CardContent style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <Typography variant="h5" component="h3">
                      Add Announcements
                    </Typography>
                    <Button variant="contained" color="secondary" className="action-button">
                      Go
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="action-card">
                  <CardContent style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <Typography variant="h5" component="h3">
                      Create Circular
                    </Typography>
                    <Button variant="contained" color="secondary" className="action-button">
                      Go
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Admindashboard;
