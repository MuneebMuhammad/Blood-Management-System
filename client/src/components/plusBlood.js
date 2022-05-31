import React, { Component } from 'react';
import Axios from 'axios';
import { motion } from 'framer-motion';

class PlusBlood extends Component {

    state = {
        bloodType: 1, 
        qty: "a",
        emptyErr: false,
        rangeErr: false,
        expireErr: false,
        beginDate: "",
        expireDate: "",
        submitDateErr: false,
        correct: false
    } 

    handleType = (event)=>{
        this.setState({bloodType: parseInt(event.target.value), correct: false})
    }

    handleQty = (event)=>{
        if (!isNaN(event.target.value)){
            this.setState({qty: parseInt(event.target.value), emptyErr: false, rangeErr: false, expireErr: false, correct: false})
        }
        else{
            this.setState({emptyErr: false, rangeErr: false, expireErr: false, correct: false})
        }
    }

    handleBegin = (event)=>{
        this.setState({beginDate: (event.target.value) , emptyErr: false, rangeErr: false, expireErr: false, correct: false, submitDateErr: false})
    }

    handleExpire = (event)=>{
        this.setState({expireDate: (event.target.value), emptyErr: false, rangeErr: false, expireErr: false, correct: false})
    }

    handleSubmit = ()=>{
        let currentdate = new Date();
        // get date in mysql date formate
        let date_time = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate();
        console.log('currentdate: ', date_time);
        console.log('submit date: ', this.state.beginDate)
        
        if (this.state.beginDate === "" || this.state.expireDate === "") 
            this.setState({emptyErr: true})
        else if (isNaN(this.state.qty) || this.state.qty <=0 || this.state.qty >100) 
            this.setState({rangeErr: true})
        else if (this.state.beginDate > this.state.expireDate)
            this.setState({expireErr: true})
        else if (new Date(currentdate) < new Date(this.state.beginDate)){
            this.setState({submitDateErr: true})
        }
        else{
            Axios.post('http://localhost:3001/plusBlood', {iso: this.props.iso, beginDate: this.state.beginDate + " 00:00:00", expireDate: this.state.expireDate + " 00:00:00", bloodType: this.state.bloodType, qty: this.state.qty}).then(()=>{
                this.setState({correct: true})
            })
        }
    }

    render() { 
        return (
            <React.Fragment>
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
                    <div className="form-group col-md-2">
                        <label htmlFor="beginning">Submission Date:</label>
                        <input type="date" onChange={this.handleBegin} className="form-control" id="beginning" name="beginning" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="expiration">Expiration Date:</label>
                        <input type="date" onChange={this.handleExpire} className="form-control" id="expiration" name="expiration" />
                    </div>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-success" style={{marginTop: "5px"}}>Add</button>
                    </form>
                    {this.state.expireErr && <h5 style={{color: "red"}}>Expiration date should be after extraction date</h5>}
                    {this.state.emptyErr && <h5 style={{color: "red"}}>Kindly Fill all the fields</h5>}
                    {this.state.submitDateErr && <h5 style={{color: "red"}}>Blood submition date can't be after today</h5>}
                    {this.state.rangeErr && <h5 style={{color: "red"}}>Quantity should only contain numbers between 1 to 100</h5>}
                    {this.state.correct && <motion.h5 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{color: "green"}}>Successfully Added Blood!</motion.h5>}
            </div>
        </React.Fragment>
        );
    }
}
 
export default PlusBlood;