import { Checkbox, colors, createTheme } from '@mui/material';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { color } from 'framer-motion';
import DataTable from './components/DataTable'
import { Attendence } from './components/Attendence';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Appbar from './components/Homepage/Appbar';
import Admindashboard from './components/Admindashboard';
import Studentdashboard from './components/Studentdashboard';
import Teacherdashboard from './components/Teacherdashboard';
import { useState } from 'react';
import { usercontext } from './components/Usercontext';
import { useEffect } from 'react';
import ManageTeachers from './components/adminactions/ManageTeachers';
import ManageStudents from './components/adminactions/ManageStudents';
import AddAnnouncement from './components/adminactions/AddAnnouncement';
import { ManagableFaculties } from './components/adminactions/ManagableFaculties';

const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Appbar/>} >
      <Route index element={<HomePage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/admin' element={<Admindashboard/>} />
      <Route path='admin/ManageTeachers' element={<ManageTeachers/>}/>
      <Route path='admin/ManagableFacuties' element={<ManagableFaculties/>} />
      <Route path='admin/ManageStudents' element={<ManageStudents/>} />
      <Route path='/student' element={<Studentdashboard/>} />
      <Route path='/teacher' element={<Teacherdashboard/>} />
      <Route path='/attendance' element={<Attendence/>} />
    </Route>
  )
)

function App() {
  const [user,setuser]=useState(() => {
    const saved = localStorage.getItem('myValue');
    return saved !== null ? JSON.parse(saved) : {
    email:'',
    instituteName:'', 
    name:'',
    password:'',
    role:''
  }});
  useEffect(() => {
    localStorage.setItem('myValue', JSON.stringify(user));
  }, [user]);
  return (
    <div>
     <usercontext.Provider value={[user,setuser]}>
      <RouterProvider router={route} />
     </usercontext.Provider>
      {/* <AddAnnouncement/> */}
     {/* <Teacherdashboard/> */}
     {/* <Studentdashboard/> */}
     {/* <Admindashboard/> */}
     {/* <Attendence/> */}
    </div>
  );
}

export default App;
