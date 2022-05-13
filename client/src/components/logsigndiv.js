import React, { Component } from 'react';
import { Link} from "react-router-dom"


function LogSignDiv(props) {

    

    return ( 
        <div style={{border: '2px solid red', padding: '3%', marginTop: props.phone === 'true'? '20%' : '5%', marginLeft: props.phone === 'true'? '25%': '10%', borderRadius: '5px', width: props.phone=== 'true'? '50%': '30%', backgroundColor: 'pink'}}>
                <center>
                
                <Link to="login"><button className='btn btn-danger logsign'>Login</button></Link> 
                <br/>
                <Link to="/signup"><button className='btn btn-danger logsign'>Signup</button></Link>
                </center>
            </div>
     );
}

export default LogSignDiv;