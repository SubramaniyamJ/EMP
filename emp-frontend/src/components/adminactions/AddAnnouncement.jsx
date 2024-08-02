// src/pages/AddAnnouncement.js

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

const AddAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [accessGroup, setAccessGroup] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const announcement = { title, description, date, accessGroup };

    // Replace this with your API call
    console.log('Announcement submitted:', announcement);

    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setAccessGroup('');
  };

  return (
    <Container maxWidth="ms">
        <Typography variant="h4" gutterBottom padding={'20px'} paddingBottom={'0'}>
          Add Announcement
        </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} paddingBottom={'10px'}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6} paddingBottom={'10px'} justifyContent={'space-around'}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6} paddingBottom={'10px'}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Access Group</InputLabel>
                <Select
                  value={accessGroup}
                  onChange={(e) => setAccessGroup(e.target.value)}
                  label="Access Group"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="students">Students</MenuItem>
                  <MenuItem value="teachers">Teachers</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<PublishIcon/>}
                >
                  Save Announcement
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddAnnouncement;
