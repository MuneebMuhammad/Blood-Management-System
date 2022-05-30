import React, { Component } from 'react';
import NavBar from './navbar';
import Axios from 'axios';

class Guest extends Component {

    state = { 
        qty: "a",
        bloodType: 1,
        immdStat: "",
        emptyDate: false,
        emptyErr: false,
        rangeErr: false,
        correct: false,
        notFound: false,
        latitude: "",
        longitude: "",
        longerr: true,
        laterr: true,
        nolocerr: false,
        careTypes: [0, 'Primary', 'Secondary', 'Tertiary'],
        hospitalData: []
     } 
    
    handleSubmit = ()=>{
        if (isNaN(this.state.qty)){
            this.setState({emptyErr: true})
        }
        else if (this.state.qty <=0 || this.state.qty >=100){
            this.setState({rangeErr: true})
        }
        else if (this.state.immdStat === ""){
            this.setState({emptyDate: true})
        }
        else if(this.state.longerr === true){
            this.setState({nolocerr: true})
        }
        else{
            this.setState({correct: true})    
            Axios.post('http://localhost:3001/guest', {longitude: this.state.longitude, latitude: this.state.latitude, bloodType: this.state.bloodType, qty: this.state.qty, beforeDate: this.state.immdStat}).then((response)=>{
                // no hospital found
                if (response.data == [0]){
                    console.log("Sorry! We couldn't find any hospitals");
                }
                // hospitals found
                else{
                    this.setState({hospitalData: response.data});
                }
            })
        }
    }

    handleType = (event)=>{
        this.setState({bloodType: event.target.value, emptyErr: false, rangeErr: false, correct: false, notFound: false})
    }

    handleQty = (event)=>{
        if (!isNaN(event.target.value)){
            this.setState({qty: parseInt(event.target.value), emptyErr: false, rangeErr: false, correct: false, notFound: false})
        }
        else{
            this.setState({emptyErr: true, rangeErr: false, correct: false, notFound: false})
        }
    }

    handleImmd = (event)=>{
        console.log(event.target.value)
        this.setState({immdStat: event.target.value, emptyErr: false, rangeErr: false, correct: false, notFound: false, emptyDate: false})
    }

    position = async () => {
        await navigator.geolocation.getCurrentPosition(
          position => this.setState({ 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude,
            longerr: false,
            laterr: false,
            nolocerr: false
          }),
          err => console.log(err)
        );
        
          if(this.state.latitude === "" && this.state.longitude === ""){
            this.setState({
              longerr: true,
              laterr: true
            })
          }
          else{
  
          }
  
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar guest="true"/>
                <div style={{marginTop: "30px"}} className="container" >
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

                        <div className="form-group col-md-2">
                        <label htmlFor="needbefore">Need Before</label>
                        <input type="date" onChange={this.handleImmd} className="form-control" id="needbefore" name="needbefore" />
                        </div>
                        
                        {this.state.longerr && 
                        <div className="form-group col-md-2" style={{marginTop: "5px", marginBottom: "5px"}}>
                        
                        <button id='locBtn' type="button" className = "btn btn-success" onClick={this.position}>Give Location</button>    
                        {/* <label htmlFor="form3Example3c">Allow hospital to get your location</label> */}
                        </div>
                        }
                        <button type="button" style={{marginTop: "20px"}} onClick={this.handleSubmit} disabled={(this.state.longerr)} className="btn btn-success">Submit</button>
                    </form>

                    {this.state.emptyErr && <h5 style={{color: "red"}}>Invalid Quantity (only numbers)</h5>}
                    {this.state.rangeErr && <h5 style={{color: "red"}}>Quantity should be between 1 to 100</h5>}
                    {this.state.notFound && <h5 style={{color: "red"}}>Sorry, we couldn't find what you want</h5>}
                    {this.state.emptyDate && <h5 style={{color: "red"}}>Date field cannot be empty</h5>}
                    {this.state.nolocerr && <h5 style={{color: "red"}}>You need to allow access to your location</h5>}
                    <table style={{marginTop: "50px"}} className="table table-striped">
                        <thead>
                        <th>Hospital Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Care Type</th>
                        <th>Contact</th>
                        </thead>
                        <tbody>
                        {this.state.correct &&      
                            this.state.hospitalData.map((Element)=>{
                                return <tr><td>{Element[0].h_name}</td><td>{Element[0].h_address}</td><td>{Element[0].h_city}</td><td>{this.state.careTypes[Element[0].care_id]}</td><td>{Element[0].contact}</td></tr>
                            })                              
                        }
                    </tbody>
                    </table>

                    </div>
  
            </React.Fragment>
            
            
        );
    }
}
 
export default Guest;