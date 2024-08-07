import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './styles/notverified.css'; 

const NotVerified = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '200px' }}>
      <Paper elevation={5} className="request-sent-paper">
        <Box textAlign="center">
          <CheckCircleOutlineIcon className="success-icon" />
          <Typography variant="h4" gutterBottom>
            Request Sent
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your request has been sent to the admin. Please wait for approval.
          </Typography>
          <Typography variant="body1">
            If you face any issues, please contact your admin.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotVerified;
