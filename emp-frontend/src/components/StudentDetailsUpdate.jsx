import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import userservice from '../services/userservice';
import { usercontext } from './Usercontext';
import { toast, ToastContainer } from 'react-toastify';
const StudentDetailsUpdate = () => {
    const [user,setuser]=useContext(usercontext);
    const [isValid,setisValid]=useState(true);
    const [classes,setClasses]=useState([{value:'',label:''}]);
    const [student, setstudent] = useState({
        student_id: null,
        reg_no:'',
        student_name: '',
        student_email: '',
        stuent_department_id: null,
        student_gender: '',
        student_dob: '',
        stuent_phone_no: '',
        student_address: '',
        student_specializations: '',
        student_class_id: null,
        student_doj: ''
    });
    const HandleUpdate = async()=>{
        if(!student.reg_no || !student.stuent_department_id || !student.student_class_id){
            toast.warn("Please fill the mandatory fields");
            setisValid(false);
            return;
        }
        

    }
    useEffect(() => {
        const fetchStudentDetails =async()=>{
            try{
                const response=await userservice.getStudentDetails(user.instituteName,user.id);
                console.log(response);
                setstudent(response[0]);
            }catch(error){
                console.log(error);
                throw(error);
            }
        }
        const fetchClasses = async () =>{
            try{
                const response=await userservice.fetchClasses(user.instituteName);
                console.log(response);
                setClasses(response.map(c => ({ value: c.class_id, label:c.class_id })));
                // response.map(c => (console.log(c.class_id)));
            }catch(error){
                console.log(error);
                throw(error);
            }
        }
        fetchStudentDetails();
        fetchClasses();
    },[])
    return (
        <>
            <Container style={{ marginTop: '100px', height: 'fit-content', display: 'flex', justifyContent: 'center', width: '100vw' }}>
                <FormControl required style={{ width: '100%' }}>
                    <Box className="login-box" p={4} boxShadow={5} borderRadius={2} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                        <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'} style={{ width: '100%', textAlign: 'center' }}>
                            Your Details
                        </Typography>
                        <TextField
                            disabled
                            required
                            value={student.student_id}
                            label="student_id"
                            onChange={(e) => setstudent({ ...student, student_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }}
                            
                             />
                        <TextField
                            type=''
                            required
                            value={student.reg_no}
                            label="reg_no"
                            onChange={(e) => setstudent({ ...student, reg_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }}
                            error={!isValid}
                            helperText={!isValid && !student.reg_no ? 'Reg no is Required' : ''}
                             />

                        <TextField
                            disabled
                            required
                            value={student.student_name}
                            label="student_name"
                            onChange={(e) => setstudent({ ...student, student_name: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }}
                             />
                        <TextField
                            disabled
                            required
                            value={student.student_email}
                            label="student_email"
                            onChange={(e) => setstudent({ ...student,student_email:e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.stuent_department_id}
                            label="stuent_department_id"
                            onChange={(e) => setstudent({ ...student, stuent_department_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} 
                            error={!isValid}
                            helperText={!isValid && !student.stuent_department_id ? 'Department Id is Required' : ''}
                            />
                        <TextField
                            
                            value={student.student_gender}
                            label="student_gender"
                            onChange={(e) => setstudent({ ...student, student_gender: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            type='date'
                            value={student.student_dob}
                            
                            onChange={(e) => setstudent({ ...student, student_dob: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.stuent_phone_no}
                            label="stuent_phone_no"
                            onChange={(e) => setstudent({ ...student, stuent_phone_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_address}
                            label="student_address"
                            onChange={(e) => setstudent({ ...student, student_address: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            
                            value={student.student_specializations}
                            label="student_specializations"
                            onChange={(e) => setstudent({ ...student, student_specializations: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            required
                            value={student.student_class_id}
                            label="student_class_id"
                            onChange={(e) => setstudent({ ...student, student_class_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} 
                            error={!isValid}
                            helperText={!isValid && !student.student_class_id? 'Class Id is Required' : ''}
                            select
                            >
                                {classes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        <TextField
                            
                            value={student.student_doj}
                            label="student_doj"
                            onChange={(e) => setstudent({ ...student, student_doj: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <Button fullWidth variant="contained" color="primary" style={{ marginTop: '40px', width: '30%' }} onClick={HandleUpdate}>Update</Button>
                    </Box>
                </FormControl>
            </Container>
            <ToastContainer/>
        </>
    )
}

export default StudentDetailsUpdate;