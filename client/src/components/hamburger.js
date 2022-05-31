import React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import "../styles/hamburger.css";

function Hamburger() {
  let {state} = useLocation();
  let navigate = useNavigate();

  function handleDelete() {  
    if (window.confirm("Are you sure you want to delete your account!")) {
      Axios.post('http://localhost:3001/deleteAccount', {iso: state.iso}).then(()=>{

        navigate('/');
      })
    }
  }  

  return (
    <div className="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label className="menu__btn" htmlFor="menu__toggle">
      <span></span>
    </label>

    <ul className="menu__box">
      <li><Link className="menu__item" to="/requestBlood" state={{iso: state.iso}}>Request Blood</Link></li>
      <li><Link className="menu__item" to="/addBlood" state={{iso: state.iso}}>Update Blood</Link></li>
      <li><Link className="menu__item" to="/requestRecieved" state={{iso: state.iso}}>Request Received</Link></li>
      <li><Link className="menu__item" to="/requestSent" state={{iso: state.iso}}>Request Sent</Link></li>
      <li><a className="menu__item" href="/">Logout</a></li>
      <li><button onClick={handleDelete} style={{borderWidth: "0px", height: "40px", marginTop: "90%", marginLeft: "28%", backgroundColor: "red", color: "white", borderRadius: "5px"}}>Delete Account</button></li>
    </ul>
  </div>
  )
}

export default Hamburger;




