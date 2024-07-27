import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import './styles/login.css';
import userservice from '../services/userservice';


const roles = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'admin', label: 'Admin' },
];

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: ''
  })

  const handleRoleChange = (event) => {
    setUser({...user, role: event.target.value});
  };

  const handleLogin = async () => {
        let bool = await userservice.checkUser(user.email, user.password, user.role);
        console.log(bool);
  };

  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Container maxWidth="sm">
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
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            margin="normal"
            variant="outlined"
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
      </Container>
    </motion.div>
  );
};

export default Login;