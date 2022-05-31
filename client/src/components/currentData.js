import React, { Component } from 'react';
import Axios from 'axios';
import {motion} from "framer-motion"


class CurrentData extends Component {

    state = { 
        bloodData: [],
        typeDict: [0, 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
     } 


    render() { 
        Axios.post('http://localhost:3001/bloodData', {iso: this.props.iso}).then((response)=>{
            if (this.state.bloodData.length === 0){
                this.setState({bloodData: response.data});
            }   
        })

        return (
            <React.Fragment>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Blood id</th>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Submition Date</th>
                            <th scope="col">Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.bloodData.map((answer, i)=>{
                            return <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><td>{answer.blood_id}</td><td>{this.state.typeDict[answer.blood_type_id]}</td><td>{answer.quantity}</td><td>{(answer.submission_date).slice(0, 10)}</td><td>{(answer.expiration_date).slice(0, 10)}</td></motion.tr>
                        })}
                        
                    </tbody>
                </table>
                
            </React.Fragment>
        );
    }
}
 
export default CurrentData;