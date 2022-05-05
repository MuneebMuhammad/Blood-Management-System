import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import MediaQuery from 'react-responsive';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <MediaQuery minWidth={407}>
                    <img src="logo.png" alt="" width="50" height="40"/>
                    </MediaQuery>
                    <MediaQuery maxWidth={406}>
                    <img src="logo.png" style={{marginLeft: '43%'}} alt="" width="50" height="40"/>
                    </MediaQuery>

                    <ul className="nav nav-pills">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Login/Signup</a>
                    </li>
                    <li className="nav-item">
                    <a className={this.props.guest === 'true'? "nav-link disabled": "nav-link"} href="guest">Find Blood</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="aboutus">About us</a>
                    </li>
                </ul> 
                </div>
            </nav>
        );
    }
}
 
export default NavBar;