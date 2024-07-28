import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box, Stack, Link, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import './styles/login.css';
import userservice from '../services/userservice';


const roles = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'admin', label: 'Admin' },
];

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    instituteName: '',
    role: ''
  })

  const handleRoleChange = (event) => {
    setUser({...user, role: event.target.value});
  };

  const handleLogin = () => {
      userservice.postUser(user);
  };


  return (
    <motion.div
      className="login-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Container maxWidth="sm" style={{marginTop:'100px',height:'fit-content'}}>
        <Box className="login-box" p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'}>
            Register
          </Typography>
          <TextField
            required
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
            required
            fullWidth
            label="Name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            margin="normal"
            variant="outlined"
          />
            <TextField
              fullWidth
              required
              label="InstituteName"
            //   type="text"
              value={user.instituteName}
              onChange={(e) => setUser({...user, instituteName: e.target.value})}
              margin="normal"
              variant="outlined"
            />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: '40px' }}
          >
            Create Account
          </Button>
          <Stack direction="row" justifyContent="end" gap="10px" margin={'20px'}>
            <Typography>already have an account ? </Typography>
                <Link underline='hover' component={'button'}><Typography>login</Typography></Link>
          </Stack>
        </Box>
      </Container>
    </motion.div>
  );
};

export default Signup;