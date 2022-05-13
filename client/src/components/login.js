import React, { Component } from 'react';
import NavBar from './navbar';
import { useNavigate } from 'react-router';
import Axios from 'axios';

function LoginFunc() {
    let navigate = useNavigate();
    return ( 
        <Login navigate = {navigate}/>
     );
}

export default LoginFunc;

class Login extends Component {

    state = { 
        userName: "",
        password: "",
        incorrect: false
     }
     
    handleLogin = (event)=>{
        // event.preventDefault();
        Axios.post('http://localhost:3001/login', {userName : this.state.userName, password : this.state.password}).then((response)=>{
            if (response.data >=0){
                this.props.navigate('/requestBlood', {state: {iso: response.data,}})
            }
            else{
                this.setState({incorrect: true})
            }
        });
    
    }

    handleUserName = (event)=>{
        this.setState({userName: event.target.value, incorrect: false});
    }

    handlePassword = (event)=>{
        this.setState({password: event.target.value, incorrect: false});
    }
    
    render() { 
        return (
            <React.Fragment>
                <NavBar guest="false"/>
                <div className="wrapper">
                <div className="logo">
                    <img src="logo.png" alt="" />
                </div>
                <div className="text-center mt-4 name">
                    BMS
                </div>
                <form className="p-3 mt-3">
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input onChange={this.handleUserName} type="text" name="userName" id="userName" placeholder="Username" />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input onChange={this.handlePassword} type="password" name="password" id="pwd" placeholder="Password" />
                    </div>
                    <button type="button" onClick={(e)=>this.handleLogin(e)} className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">
                    <a href="/signup">Sign up</a>
                </div>
                <center>
                    {this.state.incorrect === true && <h6 style={{color: "red"}}>Incorrect Username or password</h6>}
                </center>
            </div>
            </React.Fragment>
        );
    }
}
 
// export default LoginFunc;