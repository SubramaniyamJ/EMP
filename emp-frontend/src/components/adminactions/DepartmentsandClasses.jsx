import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import userservice from '../../services/userservice';
import { usercontext } from '../Usercontext';

const DepartmentsandClasses = () => {
    const [user] = useContext(usercontext);
    const [open, setOpen] = useState(false);
    const [dept, setDept] = useState({ 
        dept_id: '', 
        dept_name: '', 
        dept_incharge_id: '', 
        dept_incharge_name: '', 
        instituteName: '' 
    });
    const[depts,setDepts]=useState([]);

    useEffect(() => {
        setDept(prevDept => ({ ...prevDept, instituteName: user.instituteName }));
    }, [user.instituteName]);

    const handlecreatedept = async () => {
        if (!dept.dept_id || !dept.dept_name) {
            toast.warn("Please fill the required fields");
            return;
        }

        const updatedDept = { 
            ...dept, 
            dept_id: parseInt(dept.dept_id, 10), 
            dept_incharge_id: dept.dept_incharge_id ? parseInt(dept.dept_incharge_id, 10) : null 
        };

        try {
            const response = await userservice.createdept(updatedDept);
            if (response) {
                toast.success("Department Created Successfully");
                setDepts([...depts, updatedDept]);
                setDept({ 
                    dept_id: '', 
                    dept_name: '', 
                    dept_incharge_id: '', 
                    dept_incharge_name: '', 
                    instituteName: user.instituteName 
                });
                setOpen(false);

            } else {
                toast.error("There was an error.");
            }
        } catch (error) {
            toast.error("There was an error: " + error.message);
        }
    };

    return (
        <>
            <Box sx={{ marginTop: '100px', display: 'flex', flexDirection: 'column' }}>
                <Box padding='20px'>
                    <Button variant='contained' color='secondary' onClick={() => setOpen(true)}>Create Dept</Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap="16px" padding='20px'>
                    {depts.map((dept) => (
                        <Card key={dept.dept_id} sx={{ minWidth: 275, marginBottom: '16px', boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" textAlign='center'>
                                    {dept.dept_name}
                                </Typography>
                                <Typography color="textSecondary">
                                    Incharge: {dept.dept_incharge_name} (ID: {dept.dept_incharge_id})
                                </Typography>
                                <Typography color="textSecondary">
                                    Department ID: {dept.dept_id}
                                </Typography>
                                <Typography color="textSecondary">
                                    Institute: {dept.instituteName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {/* Handle view department action */}}>
                                    View Department
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create new Department</DialogTitle>
                <DialogContent style={{ padding: '20px' }}>
                    <TextField 
                        required
                        variant='outlined'
                        value={dept.dept_id}
                        label="Department_Id"
                        onChange={(e) => { setDept({ ...dept, dept_id: e.target.value }) }}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField 
                        required
                        variant='outlined'
                        value={dept.dept_name}
                        label="Department_Name"
                        onChange={(e) => { setDept({ ...dept, dept_name: e.target.value }) }}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField 
                        variant='outlined'
                        value={dept.dept_incharge_id}
                        label="Incharge_Id"
                        onChange={(e) => { setDept({ ...dept, dept_incharge_id: e.target.value }) }}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField 
                        variant='outlined'
                        value={dept.dept_incharge_name}
                        label="Incharge_Name"
                        onChange={(e) => { setDept({ ...dept, dept_incharge_name: e.target.value }) }}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlecreatedept}>Create Dept</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default DepartmentsandClasses;
