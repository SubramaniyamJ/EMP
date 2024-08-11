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
        {field:'student_id',headerName:'FacultyId',flex:1},
        {field:'student_name',headerName:'Facultyname',flex:1},
        {field:'student_email',headerName:'Email',flex:1},
        {field: 'student_department_id', headerName: 'Department/Grade', flex: 1,
        valueGetter: (params) => {
            if (!params || !params.row) {
                return 'N/A';
              }
            return params.row.student_department_id === null ? 'Not Assigned' : params.row.student_department_id }
        },
        {field: 'student_class_id', headerName: 'Classes', flex: 1,
            valueGetter: (params) => { 
                if (!params || !params.row) {
                    return 'N/A';
                  }
                return params.row.student_class_id === null ? 'Not Assigned' : params.row.student_class_id}
        },
        {field: 'student_specializations', headerName: 'Specialization', flex: 1,
            valueGetter: (params) => { 
                if (!params || !params.row) {
                    return 'N/A';
                  }
                return params.row.student_specialization === null ? 'Not Assigned' : params.row.student_specialization}
        }
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
    const getRowId = (row) => row.student_id;

  return (

    <Box marginTop={'100px'} padding={'30px'}>
        <DataGrid
        stikyHeader
        rows={res}
        columns={columns}
        getRowId={getRowId}
    />
    </Box>
  )
}
