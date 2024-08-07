import React, { useState } from 'react'
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';
const StudentDetails = () => {
    const [student, setstudent] = useState({
        student_id: '',
        reg_no: '',
        student_name: '',
        student_email: '',
        stuent_department_id: '',
        student_gender: '',
        student_dob: '',
        stuent_phone_no: '',
        student_address: '',
        student_specializations: '',
        student_class_id: '',
        student_doj: ''
    });

    const handleupdate = () =>{
        console.log(student)
    }
    return (
        <>
            <Container style={{ marginTop: '100px', height: 'fit-content', display: 'flex', justifyContent: 'center', width: '100vw' }}>
                <FormControl required style={{ width: '100%' }}>
                    <Box className="login-box" p={4} boxShadow={5} borderRadius={2} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                        <Typography variant="h4" gutterBottom padding={'0 0 20px 10px'} style={{ width: '100%', textAlign: 'center' }}>
                            Update Your Details
                        </Typography>
                        <TextField
                            required
                            value={student.student_id}
                            label="student_id"
                            onChange={(e) => setstudent({ ...student, student_id: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            required
                            value={student.reg_no}
                            label="reg_no"
                            onChange={(e) => setstudent({ ...student, reg_no: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />

                        <TextField
                            required
                            value={student.student_name}
                            label="student_name"
                            onChange={(e) => setstudent({ ...student, student_name: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
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
                            style={{ width: '45%' }} />
                        <TextField
                            value={student.student_gender}
                            label="student_gender"
                            onChange={(e) => setstudent({ ...student, student_gender: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <TextField
                            value={student.student_dob}
                            label="student_dob"
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
                            style={{ width: '45%' }} />
                        <TextField
                            value={student.student_doj}
                            label="student_doj"
                            onChange={(e) => setstudent({ ...student, student_doj: e.target.value })}
                            variant="outlined"
                            style={{ width: '45%' }} />
                        <Button fullWidth variant="contained" color="primary" style={{ marginTop: '40px', width: '30%' }} onClick={handleupdate}>Update</Button>
                    </Box>
                </FormControl>
            </Container>
        </>
    )
}

export default StudentDetails;