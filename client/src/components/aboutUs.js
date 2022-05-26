import React from 'react';
import "../styles/aboutus.css";
import NavBar from './navbar';

function AboutUs() {
  return (
    <div>
        <div className='cc'>
        <NavBar guest="false"/>
            <p className='aboutus'>Who Are We?</p>
            <p className='text'>An online portal that gathers information of blood donations across 
                                Government hospitals in Pakistan and provides   </p>
            <p className="text">instant access to their blood 
                                availability information to more than 200 hospitals with patients who need 
                                blood </p>
            <p className="text">donations every single day. We are working with several Medical 
                                Institutions in order to make Pakistan a healthy country.</p> 
            
        </div>
    </div>
  )
}

export default AboutUs;