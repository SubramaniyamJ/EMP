import { Checkbox, colors, createTheme } from '@mui/material';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { color } from 'framer-motion';
import DataTable from './components/DataTable'
import { Attendence } from './components/Attendence';



function App() {
  return (
    <div>
      <Login />
      {/* <Signup/> */}
      {/* <DataTable/> */}
    </div>
  );
}

export default App;
