import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../Usercontext'
import userservice from '../../services/userservice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip } from '@mui/material';

const ManageStudents = () => {
    const[user]=useContext(usercontext);
    const[result,setresult]=useState([{id:'',name:'',email:'',instituteName:''}]);

    const response = async() =>{
        try{
        const students=await userservice.manageteachersandstudents(user.instituteName,"student");
        setresult(students);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    useEffect(()=>{
        response();
    },[])

    const columns=[
        {field:'id',headerName:'Id',flex:1},
        {field:'name',headerName:'Name',flex:1},
        {field:'email',headerName:'Email',flex:1},
        {field:'Accept/Reject',headerName:'Accept/Reject',flex:1,renderCell:() => <><Chip label='Accept' color='success' style={{marginRight:'20px'}}/><Chip label='Reject' color='error' /></>}
    ]
  return (
    <>
    <Box marginTop='100px'>
    <h1>ManageStudents</h1>
        <DataGrid 
            stikyHeader
            rows={result}
            columns={columns}
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

export default ManageStudents