import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import Chatbot from './chatbot/Chatbot'; 
import { usercontext } from './Usercontext';
import userservice from '../services/userservice';
import { useNavigate } from 'react-router-dom';

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
  const navigate=useNavigate();
  const[user,setuser]=useContext(usercontext);
  const [selectedClass, setSelectedClass] = useState(null);
  const [joinedClass,setJoinedClass]=useState(false);
  const [student, setstudent] = useState({
    student_id: null,
    reg_no: null,
    student_name: '',
    student_email: '',
    student_department_id: null,
    student_gender: '',
    student_dob: '',
    student_phone_no: '',
    student_address: '',
    student_specializations: '',
    student_class_id: null,
    student_doj: ''
  });
  useEffect(() => {
    const fetchStudentDetails = async () => {
        try {
            const response = await userservice.getStudentDetailsById(user.instituteName, user.id);
            console.log(response);
            setstudent(response[0]);
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }
    fetchStudentDetails();
  }, [student.student_department_id])

  const handleClassClick = (className) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  const handleJoinClass = () => {
    navigate("/profileSettings")
  }

  return (
    <div style={{marginTop:'100px',marginLeft:'25px',marginRight:'25px',marginBottom:'25px'}}>
      <StyledBox>
        <Typography variant="h4" color="white" gutterBottom>
          Welcome {user.name} !
        </Typography>
        <Typography variant="h6" color='white '>
          Here you can see your joined classes, overall attendance percentage, grades, messages, and access the chatbot.
        </Typography>
      </StyledBox>

      <Grid container spacing={3}>
      <Grid item xs={12}>
              <Paper elevation={3} sx={{padding:2}} style={{display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center',gap:'10px'}}>
                <Typography variant='h4' >Your Class</Typography>
                <Card style={{display:'flex',flexDirection:'column',alignItems:'center',width:'300px',justifyContent:'center'}}>
                    <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                      <Typography variant="h4" textAlign='center'>
                        {student.student_class_id ? student.student_class_id : 'Not Joined'}
                        
                        </Typography>
                      <Typography color={'textSecondary'}>
                      {student.student_department_id ? student.student_department_id : 'Not Joined'}
                      
                      </Typography>
                    </CardContent>
                    <CardActions>
                     {student.student_class_id ? <Button size="small" >
                        View Class
                      </Button> : <Button size='small' onClick={handleJoinClass}>Join Class</Button> }
                    </CardActions>
                    </Card>
              </Paper>
        </Grid>
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
