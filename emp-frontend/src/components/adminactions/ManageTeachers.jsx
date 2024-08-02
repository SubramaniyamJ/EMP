import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../Usercontext';
import userservice from '../../services/userservice';
import { Box, Button, Chip , Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {toast, ToastContainer} from 'react-toastify'




const ManageTeachers = () => {
  const [user]=useContext(usercontext);
  const [res,setres]=useState([{id:'',name: '', email: '', instituteName: ''}]);
 
  const columns =[
    {field:'id',headerName:'Id',flex:1},
    {field:'name',headerName:'Facultyname',flex:1},
    {field:'email',headerName:'Email',flex:1},
    {field:'acceptorreact',headerName:'Accept/React',flex:1,renderCell: (param)=>
      <>
      <Chip onClick={() => handleAccept(param)}label='Accept' color='success'  style={{marginRight:'20px'}} />
      <Chip label='Reject' onClick={() => removeRow(param)} color='error' />
      </>
    },
  ]
  const handleAccept = async (param) => {
    console.log(param.row);
    const result = await userservice.addTeachers(param.row);
    if(!result){
      toast.warn("faculty already exists");
    }else{
      toast.success("faculty added successfully");
    }

    removeRow(param);

    // e.
  }

  const removeRow = (param) => {
    const newRes = res.filter((row) => row.id !== param.row.id);
    setres(newRes);
  }

  const response = async () => {
    try{
      const result = await userservice.manageteachersandstudents(user.instituteName,"faculty");
      // console.log(result);
      setres(result);
      
      }catch(error){
      console.log(error);
    }
  };
      
  useEffect(() => {
    response();
  }, []);

 
  return (
    <>
      <Box sx={{marginTop:'100px'}}> 
        <Typography variant='h3'>Manage Teachers</Typography>
        <DataGrid 
          stikyHeader
          rows={res}
          columns={columns}
          style={{padding:'20px'}}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
        <ToastContainer/>
      </Box>
    </>
  )
}

export default ManageTeachers;