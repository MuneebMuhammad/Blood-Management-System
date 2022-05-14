import React, { Component } from 'react';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import Axios from 'axios';


class RemoveBlood extends Component {
    state = { 
        Bid: "",
        idErr: false
     } 

    handleBid = (event)=>{
        if(!isNaN(event.target.value)){
            this.setState({Bid: parseInt(event.target.value), idErr: false})
        }
        else{
            this.setState({idErr: true})
        }   
    }

    handleRemove = (event)=>{
        Axios.post('http://localhost:3001/removeBlood', {Bid: this.state.Bid, iso: this.props.iso}).then((response)=>{})
    }

    render() { 
        return (
            <React.Fragment>
            <div className="container" >
                <form>
                    <div className="form-group">
                        <label htmlFor="bid">Blood id:</label>
                        <input type="text" className="form-control" id="bid" placeholder="Pints" name="bid" onChange={this.handleBid}/>
                    </div>
                    <button type="button" onClick={this.handleRemove} className="btn btn-danger" style={{marginTop: "5px"}}>Remove</button>
                </form>
                {this.state.idErr && <h5 style={{color: "red", marginTop: "5px"}}>Blood id should contain only numbers </h5>}
            </div>
                
        </React.Fragment>
        );
    }
}
 
export default RemoveBlood;