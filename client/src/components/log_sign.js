import React, { Component } from 'react';
import NavBar from '../components/navbar';
import '../App.css'
import {Link} from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import MediaQuery from 'react-responsive'
import LogSignDiv from './logsigndiv';

class LogSign extends Component {
    state = { 
        
    }
    
    

    render() { 
        return (
            <React.Fragment>
                
            <NavBar guest='false'/>
            <MediaQuery minWidth={1000}>
            <LogSignDiv phone='false'/>
            </MediaQuery>
            <MediaQuery maxWidth={999}>
            <LogSignDiv phone='true'/>
            </MediaQuery>
            
            </React.Fragment>
        );
    }
}
 
export default LogSign;