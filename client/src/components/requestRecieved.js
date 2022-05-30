import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import Hamburger from './hamburger';

function RequestRecieved() {
    let navigate = useNavigate()
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
       state === null || state === undefined? <NoPage /> : <RequestRecievedClass iso = {state.iso} navigate={navigate}/>  // if user is not logged in then show error
     );
}

export default RequestRecieved;

class RequestRecievedClass extends Component {
   
      state = { 
        requestsData: [],
        typeDict: [0, 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
     };

    handleAccept = (r_id)=>{
        Axios.post('http://localhost:3001/acceptRequest', {r_id: r_id, iso: this.props.iso}).then((response)=>{
            console.log("axios accept")
            this.setState({requestsData: []})
            // this.props.navigate('/requestRecieved', {state: {iso: this.props.iso}})  
        })
    }

    handleDelete = (r_id)=>{
        Axios.post('http://localhost:3001/deleteRequest', {r_id: r_id, iso: this.props.iso}).then((response)=>{
            console.log("axios delete");
            this.setState({requestsData: []})
        })
    }

    render() { 
        if (this.state.requestsData.length === 0){
            Axios.post('http://localhost:3001/requestRecieved', {iso: this.props.iso}).then((response)=>{    
                this.setState({requestsData: response.data, refresh: false}, console.log(response.data))
            })
        }
        
        return (
            <React.Fragment>
                <NavBar guest="true" />
                <Hamburger iso={this.props.iso}/>
                <SubNavbar iso={this.props.iso} page="rr"/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Blood Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Need before</th>
                        <th scope="col">Hospital Name</th>
                        <th scope="col">Contact Details</th>
                        <th scope="col">Accept</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requestsData.length !=0 && this.state.requestsData.map((Element)=>{
                            return <tr><td>{this.state.typeDict[Element[0].blood_type_id]}</td><td>{Element[0].quantity}</td><td>{(Element[0].needBefore).toString().slice(0,10)}</td><td>{Element[0].h_name}</td><td>{Element[0].contact}</td><td><button type="button" className="btn" onClick={()=>this.handleAccept(Element[0].request_id)}><img style={{width: "20px", height: "20px"}} src="accept.png"></img></button></td><td><button type="button" className="btn" onClick={()=>this.handleDelete(Element[0].request_id)}><img style={{width: "20px", height: "20px"}} src={"delete.png"}></img></button></td></tr>
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
// export default RequestRecievedClass;