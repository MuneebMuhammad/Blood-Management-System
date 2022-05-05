import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import LogSign from './components/log_sign';
import SignUp from './components/signup';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

class Application extends Component {
  state = {  } 
  render() { 
    return (
      <Router>
        <Routes>
          <Route path ="/" element={<LogSign />} />
          <Route path="/aboutus" element={<h6>about page</h6>}/>
          <Route path="/guest" element={<h6>Guest page</h6>}/>
          <Route path="/login" element={<h6>Login page</h6>} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
     
      

    );
  }
}
 
export default Application;