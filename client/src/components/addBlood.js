import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';

function AddBlood() {
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
       state === null || state === undefined? <NoPage /> : <AddBloodClass iso = {state.iso}/>  // if user is not logged in then show error
     );
}

export default AddBlood;

class AddBloodClass extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <NavBar guest="true"/>
                <SubNavbar iso={this.props.iso}/>
                <h1>Add Blood</h1>
                {this.props.iso}
            </React.Fragment>
        );
    }
}
 
// export default AddBloodClass;