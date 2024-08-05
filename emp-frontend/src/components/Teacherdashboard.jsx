import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';
import { usercontext } from './Usercontext';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const allClasses = [
  {
    id: 1,
    name: 'Mathematics',
    teacherId: 1,
    studentsCount: 30,
    notes: ['Chapter 1: Algebra', 'Chapter 2: Geometry'],
    students: ['John Doe', 'Jane Smith'],
  },
  {
    id: 2,
    name: 'Science',
    teacherId: 2,
    studentsCount: 25,
    notes: ['Chapter 1: Physics', 'Chapter 2: Chemistry'],
    students: ['Alice Brown', 'Bob Johnson'],
  },
];

const messages = [
  { id: 1, title: 'Holiday Announcement', content: 'School will be closed on Friday for a public holiday.' },
  { id: 2, title: 'New Circular', content: 'Please check the new circular regarding the upcoming exams.' },
  { id: 3, title: 'Event Notification', content: 'Join us for the annual sports day event next month.' },
];

const loggedInTeacherId = 1;

const Teacherdashboard = () => {
  const [user,setuser] = useContext(usercontext);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', teacherId: loggedInTeacherId, studentsCount: 0 });
  const [newNote, setNewNote] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setClasses(allClasses.filter(cls => cls.teacherId === loggedInTeacherId));
  }, []);

  const handleClassClick = (cls) => {
    setSelectedClass(cls === selectedClass ? null : cls);
  };

  const handleAddNote = (classId) => {
    const updatedClasses = classes.map(cls => {
      if (cls.id === classId) {
        return { ...cls, notes: [...cls.notes, newNote] };
      }
      return cls;
    });
    setClasses(updatedClasses);
    setNewNote('');
    toast.success('Note added successfully!');
  };

  const handleCreateClass = () => {
    const newClassId = classes.length + 1;
    const createdClass = { ...newClass, id: newClassId, studentsCount: 0, notes: [], students: [] };
    setClasses([...classes, createdClass]);
    setOpen(false);
    setNewClass({ name: '', teacherId: loggedInTeacherId, studentsCount: 0 });
    toast.success('Class created successfully!');
  };

  const handleAddStudent = () => {
    const updatedClasses = classes.map(cls => {
      if (cls.id === selectedClass.id) {
        return { ...cls, students: [...cls.students, newStudent], studentsCount: cls.studentsCount + 1 };
      }
      return cls;
    });
    setClasses(updatedClasses);
    setNewStudent('');
    setOpenStudentDialog(false);
    toast.success('Student added successfully!');
  };

  const handleMarkAttendance = () => {
    navigate('/attendance');
  };

  return (
    <div style={{ marginTop: '100px', marginLeft: '25px', marginRight: '25px', marginBottom: '25px' }}>
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Welcome {user.name} !
        </Typography>
        <Typography variant="h6">
          Manage your classes, mark attendance, and stay updated with messages from the admin.
        </Typography>
      </StyledBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Created Classes
            </Typography>
            <Grid container spacing={2}>
              {classes.map((cls) => (
                <Grid item xs={12} sm={6} key={cls.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{cls.name}</Typography>
                      <Typography color={'textSecondary'}>
                        Students: {cls.studentsCount}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleClassClick(cls)}>
                        View Materials
                      </Button>
                      <Button size="small" onClick={() => setOpenStudentDialog(true)}>
                        Add Student
                      </Button>
                      <Button size="small" onClick={() => handleAddNote(cls.id)}>
                        Add Note
                      </Button>
                      
                    </CardActions>
                    {selectedClass === cls && (
                      <Box sx={{ padding: 2 }}>
                        {cls.notes.map((note, index) => (
                          <Typography key={index} variant="body2">
                            {note}
                          </Typography>
                        ))}
                        <TextField
                          fullWidth
                          label="New Note"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          margin="normal"
                          variant="outlined"
                        />
                        <Button onClick={() => handleAddNote(cls.id)}>Add Note</Button>
                        <Typography variant="h6">Students</Typography>
                        {cls.students.map((student, index) => (
                          <Typography key={index} variant="body2" color={'black'}>
                            {student}
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
              Create Class
            </Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create New Class
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Mark Attendance
            </Typography>
            <Button variant="contained" onClick={handleMarkAttendance}>
              Mark Attendance
            </Button>
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
            <Typography variant="h5" gutterBottom>
              Chatbot
            </Typography>
            <Chatbot />
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            fullWidth
            variant="outlined"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateClass}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openStudentDialog} onClose={() => setOpenStudentDialog(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            fullWidth
            variant="outlined"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStudentDialog(false)}>Cancel</Button>
          <Button onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Teacherdashboard;
