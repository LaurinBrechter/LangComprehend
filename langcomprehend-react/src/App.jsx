import './App.css';
// import Button from "@mui/material/Button";
import { Select,Grid, Button, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Topbar from './components/topbar/Topbar';
import Comprehension from './components/comprehension/Comprehension';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

function App() {

  // const [name, setName] = useState('Comprehension');

  // return (
  //   <div className="App">
  //     <Topbar></Topbar>
  //     <Comprehension></Comprehension>
  //     <TextField id="outlined-basic" label="Video URL" variant="outlined"/>
  //     <TextField id="outlined-basic" label="API Key" variant="outlined"/>
  //     <Button variant="contained">Generate Questions</Button>
  //   </div>
  // );
  return (
    <Router>
      <div className="App">
        <Topbar></Topbar>
          <Routes>
            <Route path="/" element={"Home"}></Route>
            <Route path="/comprehension" element={<Comprehension/>}></Route>
            <Route path="/vocab" element={<h1>Vocab</h1>}></Route>

          </Routes>
      </div>
    </Router>
  )
}

export default App;
