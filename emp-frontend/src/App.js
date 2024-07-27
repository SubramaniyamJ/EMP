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

const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Appbar/>} >
      <Route index element={<HomePage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
    </Route>
  )
)

function App() {
  return (
    <div>
     <RouterProvider router={route} />
    </div>
  );
}

export default App;
