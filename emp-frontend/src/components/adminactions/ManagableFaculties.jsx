import { DataGrid } from '@mui/x-data-grid'
import { usercontext } from '../Usercontext';
import { Box } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import userservice from '../../services/userservice';
import { isPasteShortcut } from '@mui/x-data-grid/internals';

export const ManagableFaculties = () => {
    const [res, setRes] = useState([]);
    const [user] = useContext(usercontext); 

    const columns =[
        {field:'faculty_id',headerName:'FacultyId',flex:1},
        {field:'faculty_name',headerName:'Facultyname',flex:1},
        {field:'faculty_email',headerName:'Email',flex:1},
        // {field:'acceptorreact', headerName:'Accept/React', flex:1, renderCell: (param)=>
        //   <>
        //   <Chip onClick={() => handleAccept(param)}label='Accept' color='success'  style={{marginRight:'20px'}} />
        //   <Chip label='Reject' onClick={() => removeRow(param)} color='error' />
        //   </>
        // }
    ]  

    const getResponse = async (instituteName) => {
        const response = await userservice.manageTeacher(instituteName);
        setRes(response.data);
        console.log(response);

    }

    useEffect(() => {
        getResponse(user.instituteName);
    },[])

    // useEffect(() => {
    //     console.log(res);
    // }, [res]);
    const getRowId = (row) => row.faculty_id;

  return (

    <Box marginTop={'100px'}>
        <DataGrid
        stikyHeader
        rows={res}
        columns={columns}
        getRowId={getRowId}
    />
    </Box>
    
  )
}
