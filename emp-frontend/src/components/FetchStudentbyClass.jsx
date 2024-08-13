import React, { useContext, useEffect, useState } from 'react'
import userservice from '../services/userservice'
import { usercontext } from './Usercontext'
import { DataGrid } from '@mui/x-data-grid';

const FetchStudentbyClass = ({clas}) => {
  const [user] = useContext(usercontext);
  const [students, setStudents] = useState([{}]);
    useEffect(() => {
      const getResponse = async () => {
        const response = await userservice.fetchStudentsByClassId(clas.class_id, user.instituteName);
        setStudents(response);
        }
        getResponse();
      }, [])

    const columns = [
      {field: "student_id", headerName: "Id", flex: 1},
      {field: "student_name", headerName: "Student Name", flex: 1},
      {field: "student_gender", headerName: "Gender", flex: 1},
      {field: "student_department_id", headerName: "Department Id", flex: 1}
    ]
  return (
    <>
      <DataGrid
        stickyHeader
        rows={students}
        columns={columns}
      />
    </>
  )
}

export default FetchStudentbyClass;