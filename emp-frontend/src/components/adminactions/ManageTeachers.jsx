import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../Usercontext';
import userservice from '../../services/userservice';
import { Box, Button, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ManageTeachers = () => {
  const [user]=useContext(usercontext);
  const [res,setres]=useState([{id:'',name: '', email: '', instituteName: ''}]);
 
 
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

    const columns =[
        {field:'id',headerName:'Id',flex:1},
        {field:'name',headerName:'Facultyname',flex:1},
        {field:'email',headerName:'Email',flex:1},
        {field:'acceptorreact',headerName:'Accept/React',flex:1,renderCell:()=><><Chip label='Accept' color='success'  style={{marginRight:'20px'}} /> <Chip label='Reject' color='error' /></>},
      
    ]
  return (
    <>
      <Box sx={{marginTop:'100px'}}> 
        <h1>Manage Teachers</h1>
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
      </Box>
    </>
  )
}

export default ManageTeachers;