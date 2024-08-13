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
import Chatbot from '../Chatbot';
import { usercontext } from '../Usercontext';
import userservice from '../../services/userservice';

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
  const [faculty, setFaculty] = useState({});
  const [thisAnc, setThisAnc] = useState([{}]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', teacherId: loggedInTeacherId, studentsCount: 0 });
  const [newNote, setNewNote] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const navigate = useNavigate();
  const [yourClass,setYourClass]=useState({class_id:null,class_name:'',class_incharge:'',faculty_in_charge_id:null,department_id:null});
  useEffect(() => {
     const fetchYourClass = async()=>{
      try{
        const urclass= await userservice.getYourClass(user.instituteName,user.id);
        console.log(urclass);
        if(urclass.length>0)
        setYourClass(urclass[0]);
        
      }catch(error){
        console.log(error);
      }
    }
    fetchYourClass();
  },[]);

  useEffect(() => {
    const getResponse = async () => {
      const response = await userservice.fetchFacultyByUserId(
        user.id,
        user.instituteName
      );
      setFaculty(response[0]);
    };
    getResponse();
  }, []);

  useEffect(() => {
    const getAnnouncement = async () => {
      const response = await userservice.fetchAnnouncements(user.instituteName);
      const filterAnnouncement = () => {
        const filtered = response.filter((announcement) => {
          if (announcement.role !== "all" && announcement.role !== "staff") {
            return false;
          }

          if (announcement.access_group === "Departments") {
            return (
              announcement.dept_id === 0 ||
              announcement.dept_id === faculty.faculty_department_id
            );
          } else if (announcement.access_group === "Class") {
            return (
              announcement.class_id === 0 ||
              (announcement.dept_id === faculty.faculty_department_id &&
                announcement.class_id === faculty.faculty_class_id)
            );
          } else {
            return true;
          }
        }).sort((one, two) => two.announcement_id - one.announcement_id);
        return filtered;
      };
      setThisAnc(filterAnnouncement());
    };
    getAnnouncement();
  }, [faculty]);



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
  const handleViewClass = () =>{
    navigate('/YourClass', {
      state: {
        instituteName: user.instituteName,
        class_id: yourClass.class_id,
      },
    });
  }

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
        <Grid item xs={6}>
              <Paper elevation={3} sx={{padding:2}} style={{display:'flex',justifyContent:'center', flexDirection:'column',alignItems:'center',gap:'10px'}}>
                <Typography variant='h4' >Your Class</Typography>
                <Card style={{display:'flex',flexDirection:'column',alignItems:'center',width:'300px',justifyContent:'center'}}>
                    <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                      <Typography variant="h4" textAlign='center'>{yourClass.class_name ? yourClass.class_name : 'Not Assigned'}</Typography>
                      <Typography color={'textSecondary'}>
                        DepartmentID:{yourClass.department_id ? yourClass.department_id : 'null'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small"onClick={yourClass.class_name ? handleViewClass : null}>
                        View Class
                      </Button>
                    </CardActions>
                    </Card>
              </Paper>
        </Grid>
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
              Create Class
            </Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create New Class
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom style={{paddingBottom: '30px'}}>
              Announcements
            </Typography>
            <Grid container spacing={2}>
            {thisAnc.map((announcement) => (
              <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box key={announcement.announcement_id} sx={{ mb: 2 }}>
                  <Typography variant="h6" color={"black"} gutterBottom>
                    {announcement.title}
                  </Typography>
                  <Typography variant="body1" color={"black"} gutterBottom>
                    {announcement.date}
                  </Typography>
                  <Typography variant="body2" color={"black"} gutterBottom>
                    {announcement.description}
                  </Typography>
                </Box>
                </CardContent>

              </Card>
              </Grid>
            ))}
          </Grid>
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
