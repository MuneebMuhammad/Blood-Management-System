import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';

function RequestRecieved() {
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
       state === null || state === undefined? <NoPage /> : <RequestRecievedClass iso = {state.iso}/>  // if user is not logged in then show error
     );
}

export default RequestRecieved;

class RequestRecievedClass extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <NavBar guest="true" />
                <SubNavbar iso={this.props.iso}/>
                <h1>Request Recieved</h1>
                {this.props.iso}
            </React.Fragment>
        );
    }
}
 
// export default RequestRecievedClass;