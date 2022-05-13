import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import LogSign from './components/log_sign';
import SignUp from './components/signup';
import RequestBlood from './components/requestBlood';
import LoginFunc from './components/login';
import NoPage from './components/noPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddBlood from './components/addBlood';
import RequestRecieved from './components/requestRecieved';

class Application extends Component {
  state = {  } 
  render() { 
    return (
      <Router>
        <Routes>
          <Route path ="/" element={<LogSign />} />
          <Route path="/aboutus" element={<h6>about page</h6>}/>
          <Route path="/guest" element={<h6>Guest page</h6>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginFunc />} />
          <Route path="/termscond" element={<h6>These are the terms and conditions</h6>}/>
          <Route path="/requestBlood" element={<RequestBlood />} />
          <Route path="/addBlood" element={<AddBlood />} />
          <Route path="/requestRecieved" element={<RequestRecieved />} />
          <Route path="/noPage" element={<NoPage />} />

        </Routes>
      </Router>
     
      

    );
  }
}
 
export default Application;