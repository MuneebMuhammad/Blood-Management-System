import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function SubNavbar(props) {
    let {state} = useLocation()

    return ( 
        <nav className="nav nav-pills nav-fill" style={{marginBottom: "40px"}}>
            <Link className="nav-item nav-link" style={{color: props.page === "rb"? "maroon": "red"}} to={"/requestBlood"} state={{iso: state.iso}}>Request Blood</Link>
            <Link className="nav-item nav-link" style={{color: props.page === "ab"? "maroon": "red"}} to={"/addBlood"} state={{iso: state.iso}}>Update Blood</Link>
            <Link className="nav-item nav-link" style={{color: props.page === "rr"? "maroon": "red"}} to={"/requestRecieved"} state={{iso: state.iso}}>Request Received</Link>
        </nav>
     );
}

export default SubNavbar;