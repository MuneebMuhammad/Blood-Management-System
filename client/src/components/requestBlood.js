import React, { Component } from 'react';
import NavBar from './navbar';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import SubNavbar from './SubNavBar';
import Axios from 'axios';

function RequestBlood() {
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
       state === null || state === undefined? <NoPage /> : <RequestBloodClass iso = {state.iso}/>  // if user is not logged in then show error
     );
}

export default RequestBlood;

class RequestBloodClass extends Component {

    state = { 
        toggleState: false,
        qty: "a",
        bloodType: 1,
        immdStat: 1,
        emptyErr: false,
        rangeErr: false,
        correct: false
     } 
    
    handleSubmit = ()=>{
        if (isNaN(this.state.qty)){
            this.setState({emptyErr: true})
        }
        else if (this.state.qty <=0 || this.state.qty >=100){
            this.setState({rangeErr: true})
        }
        else{
            this.setState({correct: true})
            Axios.post('http://localhost:3001/requestBlood', {iso: this.props.iso[0], bloodType: this.state.bloodType, qty: this.state.qty, immdStat: this.state.immdStat}).then(()=>{})

        }
    }

    handleToggle = ()=>{
        let newstate = this.state.toggleState ? false : true;
        this.setState({toggleState: newstate})
    }

    handleType = (event)=>{
        this.setState({bloodType: event.target.value, emptyErr: false, rangeErr: false, correct: false})
    }

    handleQty = (event)=>{
        if (!isNaN(event.target.value)){
            this.setState({qty: parseInt(event.target.value), emptyErr: false, rangeErr: false, correct: false})
        }
        else{
            this.setState({emptyErr: true, rangeErr: false, correct: false})
        }
    }

    handleImmd = (event)=>{
        this.setState({immdStat: event.target.value, emptyErr: false, rangeErr: false, correct: false})
    }


    render() { 
        return (
            <React.Fragment>
                <NavBar guest="true"/>
                <SubNavbar iso={this.props.iso} page="rb"/>
                <div className="container" >
                    <h2>Request Details</h2>
                    <form>
                    <div className="form-group">
                        <label htmlFor="bloodType">Blood Type</label>
                        <select id="bloodType" className="form-control" onChange={this.handleType}>
                            <option value={1}>A+</option>
                            <option value={2}>A-</option>
                            <option value={3}>B+</option>
                            <option value={4}>B-</option>
                            <option value={5}>O+</option>
                            <option value={6}>O-</option>
                            <option value={7}>AB+</option>
                            <option value={8}>AB-</option>
                        </select>
                        </div>

                        <div className="form-group">
                        <label htmlFor="qty">Quantity:</label>
                        <input type="text" className="form-control" id="qty" placeholder="Pints" name="qty" onChange={this.handleQty}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="urgent">Urgent Status (10 most urgent)</label>
                        <select id="urgent" className="form-control" onChange={this.handleImmd}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        </div>
                        
                        <div className="checkbox">
                        <label><input onChange={this.handleToggle} type="checkbox" name="remember" /> confirm</label>
                        </div>
                        <button type="button" onClick={this.handleSubmit} disabled={!this.state.toggleState} className="btn btn-success">Submit</button>
                    </form>
                    {this.state.emptyErr && <h5 style={{color: "red"}}>Invalid Quantity (only numbers)</h5>}
                    {this.state.rangeErr && <h5 style={{color: "red"}}>Quantity should be between 1 to 100</h5>}
                    {this.state.correct && <h5 style={{color: "green"}}>Successfully Request Send!</h5>}
                    </div>
  
            </React.Fragment>
            
            
        );
    }
}
 
// export default RequestBlood;