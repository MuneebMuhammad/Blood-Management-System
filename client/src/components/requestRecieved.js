import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import { useNavigate } from 'react-router';
import Axios from 'axios';

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
                            return <tr><td>{this.state.typeDict[Element[0].blood_type_id]}</td><td>{Element[0].quantity}</td><td>{(Element[0].needBefore).toString().slice(0,10)}</td><td>{Element[0].h_name}</td><td>{Element[0].contact}</td><td><button type="button" className="btn" onClick={()=>this.handleAccept(Element[0].request_id)}><img style={{width: "20px", height: "20px"}} src="data:image/jpeg;base64,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"></img></button></td><td><button type="button" className="btn" onClick={()=>this.handleDelete(Element[0].request_id)}><img style={{width: "20px", height: "20px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6UObWmfMzJE7M1Eo0BaRdGuAsrQIIz7bNw&usqp=CAU"}></img></button></td></tr>
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
// export default RequestRecievedClass;