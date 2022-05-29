import React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../styles/hamburger.css";

function Hamburger() {
  let {state} = useLocation()
  return (
    <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li><Link class="menu__item" to="/requestBlood" state={{iso: state.iso}}>Request Blood</Link></li>
      <li><Link class="menu__item" to="/addBlood" state={{iso: state.iso}}>Update Blood</Link></li>
      <li><Link class="menu__item" to="/requestRecieved" state={{iso: state.iso}}>Request Received</Link></li>
      <li><Link class="menu__item" to="/requestSent" state={{iso: state.iso}}>Request Sent</Link></li>
      <li><a class="menu__item" href="/">Logout</a></li>
    </ul>
  </div>
  )
}

export default Hamburger;




