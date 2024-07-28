import React from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material';
import './Appbar.css'
import { Link, Outlet } from 'react-router-dom';
const Appbar = () => {
  return (
    <div>
    <AppBar position="fixed" className="app-bar" style={{backgroundColor:'purple'}}> 
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            EduManage
          </Typography>
          <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit" >Home</Button></Link>
          <Link to='/login' style={{textDecoration:'none',color:'white'}}><Button color="inherit" >Login</Button></Link>
          <Link to='/register' style={{textDecoration:'none',color:'white'}}><Button color="inherit" >Register</Button></Link>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet/>
      </main>
      </div>
  )
}
export default Appbar;