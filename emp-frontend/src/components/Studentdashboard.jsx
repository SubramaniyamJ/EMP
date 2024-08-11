import React, { useContext, useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import Chatbot from './chatbot/Chatbot'; 
import { usercontext } from './Usercontext';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'black',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const classes = [
  { id: 1, name: 'Mathematics', teacher: 'Mr. John', notes: ['Chapter 1: Algebra', 'Chapter 2: Geometry'] },
  { id: 2, name: 'Science', teacher: 'Ms. Smith', notes: ['Chapter 1: Physics', 'Chapter 2: Chemistry'] },
  { id: 3, name: 'History', teacher: 'Mr. Brown', notes: ['Chapter 1: Ancient Civilizations', 'Chapter 2: Middle Ages'] },
];

const grades = [
  { id: 1, subject: 'Mathematics', grade: 'A' },
  { id: 2, subject: 'Science', grade: 'A-' },
  { id: 3, subject: 'History', grade: 'B+' },
];

const messages = [
  { id: 1, title: 'Holiday Announcement', content: 'School will be closed on Friday for a public holiday.' },
  { id: 2, title: 'New Circular', content: 'Please check the new circular regarding the upcoming exams.' },
  { id: 3, title: 'Event Notification', content: 'Join us for the annual sports day event next month.' },
];

const Studentdashboard = () => {
  const[user,setuser]=useContext(usercontext);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (className) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  return (
    <div style={{marginTop:'100px',marginLeft:'25px',marginRight:'25px',marginBottom:'25px'}}>
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Welcome {user.name} !
        </Typography>
        <Typography variant="h6" color='white '>
          Here you can see your joined classes, overall attendance percentage, grades, messages, and access the chatbot.
        </Typography>
      </StyledBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Joined Classes
            </Typography>
            <Grid container spacing={2}>
              {classes.map((cls) => (
                <Grid item xs={12} sm={6} key={cls.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{cls.name}</Typography>
                      <Typography>
                        Teacher: {cls.teacher}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleClassClick(cls.name)}>
                        View Materials
                      </Button>
                    </CardActions>
                    {selectedClass === cls.name && (
                      <Box sx={{ padding: 2 }}>
                        {cls.notes.map((note, index) => (
                          <Typography key={index} variant="body2" color={'black'}>
                            {note}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Overall Attendance & Grades
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" color={'black'}>
                Overall Attendance: 85%
              </Typography>
            </Box>
            <DataGrid
              rows={grades}
              columns={[
                { field: 'subject', headerName: 'Subject', width: 150 },
                { field: 'grade', headerName: 'Grade', width: 150 },
              ]}
              pageSize={5}
              autoHeight
              disableColumnMenu
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Messages
            </Typography>
            {messages.map((message) => (
              <Box key={message.id} sx={{ mb: 2 }}>
                <Typography variant="h6" color={'black'}>{message.title}</Typography>
                <Typography variant="body2" color={'black'}>{message.content}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            
            <Chatbot />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Studentdashboard;
