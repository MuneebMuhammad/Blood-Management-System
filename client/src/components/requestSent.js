import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
import NoPage from './noPage';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import Axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import Hamburger from './hamburger';

function RequestSent() {
    let {state} = useLocation()  // gets the value passed in usenavigate() hook
    return ( 
        state === null || state === undefined? <NoPage /> : <RequestSentClass iso = {state.iso}/>  // if user is not logged in then show error
     );
}

export default RequestSent;

class RequestSentClass extends Component {
    state = { 
        myRequestData: [],
        refresh: false
     } 

    // in mysql to javascript date transfer there is mismatch in date type.
    correctDate(reqDate){
        let dateOnly = reqDate.slice(0, 10);
        let hourOnly = parseInt(reqDate.slice(11, 13)) + 5;
        let timeOnly = reqDate.slice(13, 19);
        return dateOnly + " " + hourOnly + timeOnly;
    }

    render() { 
        if(this.state.myRequestData.length === 0){
            Axios.post('http://localhost:3001/requestSent', {iso: this.props.iso}).then((response)=>{
                this.setState({myRequestData: response.data})
                console.log(response.data)
            })
        }
        return (
            <React.Fragment>
                <NavBar guest="true" />
                <Hamburger iso={this.props.iso}/>
                <SubNavbar iso={this.props.iso} page="rs"/>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                        <th scope="col">Blood Type</th>
                        <th scope="col">Quantity</th>
                        <th scope='col'>Request Date</th>
                        <th scope="col">Need Before</th>
                        <th scope="col">Acceptance</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.myRequestData.map((element) => {
                            return (<tr><td>{element[1]}</td><td>{element[3]}</td><td>{this.correctDate(element[2])}</td><td>{element[4]}</td>
                            <td>
                            {element.length == 5 ? <span style={{color: "red"}}>Pending...</span>: <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Accepted
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Accepted by: {element[5]}</Dropdown.Item>
                                    <Dropdown.Item >Contact: {element[7]}</Dropdown.Item>
                                    <Dropdown.Item>Location: {element[6]}</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>}
                            </td>
                            </tr>)
                            
                        })}
                        
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
 
// export default RequestSentClass;