import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import './styles/login.css';
import userservice from '../services/userservice';
import { toast, ToastContainer } from 'react-toastify';


const roles = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'admin', label: 'Admin' },
];

const Login = () => {
  const [isValid, setValid] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: ''
  })

  const handleRoleChange = (event) => {
    setUser({...user, role: event.target.value});
  };

  const handleLogin = async () => {
    if(!user.role || !user.email || !user.password){
      toast.warn('All fields required');
      setValid(false);
      return;
    }
        let response = await userservice.checkUser(user.email, user.password, user.role);
        console.log(response.data);
        if(response.data){
          toast.success("Welcome to EduManage");
        }else{
          toast.error("Incorrect Details");  
        }
        
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Container maxWidth="sm" style={{marginTop:'100px'}}>
        <Box className="login-box" p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'}>
            Login
          </Typography>
          <TextField
            fullWidth
            select
            label="Select Role"
            value={user.role}
            onChange={handleRoleChange}
            margin="normal"
            variant="outlined"
            error = {!isValid && !user.role}
            helperText = {!isValid && !user.role ? 'Role required' : ''}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            margin="normal"
            variant="outlined"
            error = {!isValid && !user.email}
            helperText = {!isValid && !user.email ? 'Email required' : ''}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            margin="normal"
            variant="outlined"
            error = {!isValid && !user.password}
            helperText = {!isValid && !user.password ? 'Password required' : ''}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            style={{ marginTop: '40px' }}
          >
            login
          </Button>
          <Stack direction="row" justifyContent="end" gap="10px" margin={'20px'} >
            <Typography>doesn't have account? </Typography>
                <Link underline='hover' component={'button'}><Typography>Signup</Typography></Link>
          </Stack>
        </Box>
        <ToastContainer/>
      </Container>
    </motion.div>
  );
};

export default Login;