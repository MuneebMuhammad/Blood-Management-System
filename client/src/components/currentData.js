import React, { Component } from 'react';
import Axios from 'axios';

class CurrentData extends Component {

    state = { 
        bloodData: []
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
                            <th scope="col">Extraction Date</th>
                            <th scope="col">Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.bloodData.map((answer, i)=>{
                            return <tr><td>{answer.blood_id}</td><td>answer.blood_type_id</td><td>{answer.quantity}</td><td>{(answer.submission_date).slice(0, 10)}</td><td>{(answer.expiration_date).slice(0, 10)}</td></tr>
                        })}
                        
                    </tbody>
                </table>
                
            </React.Fragment>
        );
    }
}
 
export default CurrentData;