import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Chatbot = () => {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Chatbot coming soon...
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary">
        Send
      </Button>
    </Box>
  );
};

export default Chatbot;
