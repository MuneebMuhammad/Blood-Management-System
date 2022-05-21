import React, { Component } from 'react';
import NavBar from './navbar';
import SubNavbar from './SubNavBar';
import Axios from 'axios';


class RemoveBlood extends Component {
    state = { 
        qty: "",
        Bid: "",
        qtyErr: false,
        idErr: false,
        missingErr: false,
        missingQty: false,
        qtyRange: false,
        correct: false
     } 

    handleBid = (event)=>{
        // if correct value then set all errors as false
        if(!isNaN(event.target.value)){
            this.setState({Bid: parseInt(event.target.value), idErr: false, missingErr: false, correct: false})
        }
        // if blood id is not number then enable idErr. Remove any other errors
        else{
            this.setState({idErr: true, missingErr: false, correct: false})
        }   
    }

    handleQty = (event)=>{
        if(!isNaN(event.target.value)){
            this.setState({qty: parseInt(event.target.value), qtyErr: false, qtyRange: false, missingQty: false, correct: false})
        }
        else{
            this.setState({qty: "", qtyErr: true, qtyRange: false, missingQty: false, correct: false})
        } 
    }

    handleRemove = (event)=>{
        Axios.post('http://localhost:3001/removeBlood', {Bid: this.state.Bid, iso: this.props.iso, qty: this.state.qty}).then((response)=>{
            console.log(response.data)
            if (response.data == 2) this.setState({missingErr: false, correct: true})
            else if(response.data == 1) this.setState({qtyRange: true, missingQty: false, correct: false})
            else if(response.data == 3) this.setState({missingQty: true, qtyRange: false, correct: false})
            else this.setState({missingErr: true, correct: false})
        })
    }

    render() { 
        return (
            <React.Fragment>
            <div className="container" >
                <form>
                    <div className="form-group">
                        <label htmlFor="bid">Blood id:</label>
                        <input type="text" className="form-control" id="bid" placeholder="Enter Blood ID" name="bid" onChange={this.handleBid}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="wty">Quantity:</label>
                        <input type="text" className="form-control" id="qtt" placeholder="Pints" name="qty" onChange={this.handleQty}/>
                    </div>
                    <button type="button" onClick={this.handleRemove} className="btn btn-danger" style={{marginTop: "5px"}}>Remove</button>
                </form>
                {this.state.idErr && <h5 style={{color: "red", marginTop: "5px"}}>Blood id should contain only numbers </h5>}
                {this.state.missingErr && <h5 style={{color: "red", marginTop: "5px"}}>Blood id do not exist</h5>}
                {this.state.qtyErr && <h5 style={{color: "red", marginTop: "5px"}}>Blood quantity should contain only numbers </h5>}
                {this.state.qtyRange && <h5 style={{color: "red", marginTop: "5px"}}>Blood quantity is out of range</h5>}
                {this.state.correct && <h5 style={{color: "green", marginTop: "5px"}}>Successfully removed blood</h5>}
            </div>
                
        </React.Fragment>
        );
    }
}
 
export default RemoveBlood;