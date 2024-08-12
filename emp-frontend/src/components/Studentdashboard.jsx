import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import Chatbot from "./chatbot/Chatbot";
import { usercontext } from "./Usercontext";
import userservice from "../services/userservice";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "black",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const classes = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. John",
    notes: ["Chapter 1: Algebra", "Chapter 2: Geometry"],
  },
  {
    id: 2,
    name: "Science",
    teacher: "Ms. Smith",
    notes: ["Chapter 1: Physics", "Chapter 2: Chemistry"],
  },
  {
    id: 3,
    name: "History",
    teacher: "Mr. Brown",
    notes: ["Chapter 1: Ancient Civilizations", "Chapter 2: Middle Ages"],
  },
];

const grades = [
  { id: 1, subject: "Mathematics", grade: "A" },
  { id: 2, subject: "Science", grade: "A-" },
  { id: 3, subject: "History", grade: "B+" },
];

const messages = [
  {
    id: 1,
    title: "Holiday Announcement",
    content: "School will be closed on Friday for a public holiday.",
  },
  {
    id: 2,
    title: "New Circular",
    content: "Please check the new circular regarding the upcoming exams.",
  },
  {
    id: 3,
    title: "Event Notification",
    content: "Join us for the annual sports day event next month.",
  },
];

const Studentdashboard = () => {
  const [user, setuser] = useContext(usercontext);
  const [thisAnc, setThisAnc] = useState([{}]);
  const [student, setStudent] = useState({});

  useEffect(() => {
    const getResponse = async () => {
      const response = await userservice.fetchStudentByUserId(
        user.id,
        user.instituteName
      );
      setStudent(response[0]);
    };

    getResponse();
  }, []);

  // useEffect(() => {
  //   console.log(student);
  // }, [student]);

  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassClick = (className) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  useEffect(() => {
    const getAnnouncement = async () => {
      const response = await userservice.fetchAnnouncements(user.instituteName);
      const filterAnnouncement = () => {
        const filtered = response.filter((announcement) => {
          if (announcement.role !== "all" && announcement.role !== "students") {
            return false;
          }

          if (announcement.access_group === "Departments") {
            return (
              announcement.dept_id === 0 ||
              announcement.dept_id === student.student_department_id
            );
          } else if (announcement.access_group === "Class") {
            return (
              announcement.class_id === 0 ||
              (announcement.dept_id === student.student_department_id &&
                announcement.class_id === student.student_class_id)
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
  }, [student]);

  // useEffect(() => {
  //   console.log(thisAnc);
  // }, [thisAnc]);

  return (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "25px",
        marginRight: "25px",
        marginBottom: "25px",
      }}
    >
      <StyledBox>
        <Typography variant="h4" color="white" gutterBottom>
          Welcome {user.name} !
        </Typography>
        <Typography variant="h6" color="white ">
          Here you can see your joined classes, overall attendance percentage,
          grades, messages, and access the chatbot.
        </Typography>
      </StyledBox>

      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
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
        </Grid> */}
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
                      <Typography>Teacher: {cls.teacher}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleClassClick(cls.name)}
                      >
                        View Materials
                      </Button>
                    </CardActions>
                    {selectedClass === cls.name && (
                      <Box sx={{ padding: 2 }}>
                        {cls.notes.map((note, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            color={"black"}
                          >
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
              <Typography variant="body1" color={"black"}>
                Overall Attendance: 85%
              </Typography>
            </Box>
            <DataGrid
              rows={grades}
              columns={[
                { field: "subject", headerName: "Subject", width: 150 },
                { field: "grade", headerName: "Grade", width: 150 },
              ]}
              pageSize={5}
              autoHeight
              disableColumnMenu
            />
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
