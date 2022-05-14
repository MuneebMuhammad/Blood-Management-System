import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import RemoveBlood from './removeBlood';
import CurrentData from './currentData';
import PlusBlood from './plusBlood';

function AddBlood() {
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
       state === null || state === undefined? <NoPage /> : <AddBloodClass iso = {state.iso}/>  // if user is not logged in then show error
     );
}

export default AddBlood;

class AddBloodClass extends Component {
    state = { 
        plusbtn: true,
        removebtn: false,
        databtn: false
     } 

    handlePlus = ()=>{
        this.setState({plusbtn: true, removebtn: false, databtn: false})
    }

    handleRemove = ()=>{
        this.setState({plusbtn: false, removebtn: true, databtn: false})
    }

    handleData = ()=>{
        this.setState({plusbtn: false, removebtn: false, databtn: true})
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar guest="true"/>
                <SubNavbar iso={this.props.iso} page="ab"/>
                <center style={{marginBottom: "20px"}}>
                    <form>
                        <button onClick={this.handlePlus} type='button' style={{borderRightWidth:"0px", height: "50px", width: "20%", color: this.state.plusbtn ? "silver": ""}}>Add Blood</button>
                        <button onClick={this.handleRemove} type='button' style={{borderRightWidth:"0px",height: "50px", width: "20%", color: this.state.removebtn ? "silver": ""}}>Remove Blood</button>
                        <button onClick={this.handleData} type='button' style={{height: "50px", width: "20%", color: this.state.databtn ? "silver": ""}}>Current data</button>
                    </form>
                </center>
                {this.state.removebtn ? <RemoveBlood iso={this.props.iso}/>: ""}
                {this.state.databtn ? <CurrentData iso={this.props.iso}/>: ""}
                {this.state.plusbtn ? <PlusBlood iso={this.props.iso}/>: ""}
                
            </React.Fragment>
        );
    }
}
 
// export default AddBloodClass;