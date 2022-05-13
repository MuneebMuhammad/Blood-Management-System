import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function SubNavbar() {
    let {state} = useLocation()

    return ( 
        <nav className="nav nav-pills nav-fill">
            <Link className="nav-item nav-link" style={{color: "red"}} to={"/requestBlood"} state={{iso: state.iso}}>Request Blood</Link>
            <Link className="nav-item nav-link" style={{color: "red"}} to={"/addBlood"} state={{iso: state.iso}}>Add Blood</Link>
            <Link className="nav-item nav-link" style={{color: "red"}} to={"/requestRecieved"} state={{iso: state.iso}}>Request Recieved</Link>
        </nav>
     );
}

export default SubNavbar;