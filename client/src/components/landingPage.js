import React from 'react';
import "../styles/landingPage.css";
import NavBar from '../components/navbar';



function Home() {

  return (
    <div>
        <div className='container-2'>
            <NavBar guest="false"/>
            <div className='about-header'>
                <div className='dark-overlay'>
                    <h1 className='page-name'>BMS</h1>
                    <h2 className='motto'>A drop of life</h2>
                </div>
            </div>
        </div>
        <div className='container-2'>
            <div className='lower-container'>
            <div className='lower-container-image'/>
                <div className='lower-container-right'>
                    <h1 className='find-blood-text'>Find Blood Near You</h1>
                    <a href="/guest"><button className='button-find'>Find</button></a>
                </div>
            </div>
        </div>
        <div className='container-2'>
            <div className='header-image'>
                
            </div>
            <a href="/login"><button className='portal-btn'>Portal</button></a>
        </div>
    </div>

  );
}

export default Home;