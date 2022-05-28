import React from 'react';
import "../styles/hamburger.css";

function Hamburger() {
  return (
    <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li><a class="menu__item" href="/requestBlood">Request Blood</a></li>
      <li><a class="menu__item" href="/addBlood">Update Blood</a></li>
      <li><a class="menu__item" href="/requestRecieved">Request Received</a></li>
      <li><a class="menu__item" href="/requestSent">Request Sent</a></li>
      <li><a class="menu__item" href="/">Logout</a></li>
    </ul>
  </div>
  )
}

export default Hamburger;




