import React, { Component} from 'react';
import NavBar from './navbar';
import Axios from 'axios';

class SignUp extends Component {
    state = { 
        name: "",
        userName: "",
        pass: "",
        cfmPass: "",
        phn: "",
        city: "",
        care: "1",
        iso: "",
        address: "",
        emptyErr: false,
        passErr: false,
        isoErr: false,
        termsToggle: true
     } 

     
 
    handleRegister = ()=>{
        let isoe = false 

        if (this.state.name === "" || this.state.userName === "" || this.state.pass === "" || this.state.cfmPass === "" || this.state.phn ===  ""|| this.state.city === "" || this.state.care === ""){
            console.log("Kindly fill out every field")
            this.setState({emptyErr: true})
        }
        else if (this.state.pass !== this.state.cfmPass){
            console.log("Passwords do not match")
            this.setState({passErr: true})
        }
        else{
            Axios.get('http://localhost:3001/hospitalIso').then((response)=>{
            for (let i =0; i< (response.data).length; i++){
                if (response.data[i].h_id == this.state.iso || response.data[i].username == this.state.name){
                    isoe = true;
                    this.setState({isoErr: true})
                    console.log("Username and Iso number should be unique")
                    break;
                }
            }
                if (!isoe){
                    Axios.post('http://localhost:3001/registerHospital', {name: this.state.name, userName: this.state.userName, pass: this.state.pass,
                    cfmPass: this.state.pass, phn: this.state.phn, city: this.state.city, care: this.state.care, iso: this.state.iso, address: this.state.address}).then(()=>{
                    alert("success ")
                    });
                    console.log("Hospital Regestered")
                    this.setState({isoErr: false, emptyErr: false, passErr: false})
                    isoe = false;
                }
            })        
            

           
        }
    }

    handleToggle = ()=>{
        let newToggle = this.state.termsToggle === true? false : true;
        this.setState({termsToggle: newToggle})
    }

    handleName = (event)=>{
        this.setState({name: event.target.value})
    }

    handleUserName = (event)=>{
        this.setState({userName: event.target.value})
    }

    handlePass = (event)=>{
        this.setState({pass: event.target.value})
    }

    handleCfmPass = (event)=>{
        this.setState({cfmPass: event.target.value})
    }

    handlePhone = (event)=>{
        this.setState({phn: event.target.value})
    }

    handleCare = (event)=>{
        this.setState({care: event.target.value})
    }

    handleCity = (event)=>{
        this.setState({city: event.target.value})
    }

    handleIso = (event)=>{
        this.setState({iso: event.target.value})
    }

    handleAddr = (event)=>{
        this.setState({address: event.target.value})
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar guest="false"/>

                <section className="vh-100" style={{backgroundcolor: 'red'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderradius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleName} type="text" id="hname" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Hospital Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleUserName} type="text" id="huserName" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">UserName</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handlePass} type="password" id="hpass" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleCfmPass} type="password" id="hcfmpass" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handlePhone} type="text" id="hphn" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Contact Number</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleAddr} type="text" id="haddr" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Hospital's Address</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleCity} type="text" id="hcty" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Hospital's City Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input onChange={this.handleIso} type="text" id="hiso" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Hospital ISO</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <select onChange={this.handleCare} name="cars" id="hcare" className="form-control">
                        <option value="1">Primary</option>
                        <option value="2">Secondary</option>
                        <option value="3">Tertiary</option>
                      </select>
                      <label className="form-label" htmlFor="form3Example3c">Hospital's Care Type</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input onClick={this.handleToggle} className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="/termscond">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button onClick={(e) => this.handleRegister(e)} disabled={this.state.termsToggle} type="button" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                  className="img-fluid" alt="Sample" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

            </React.Fragment>
        );
    }
}
 
export default SignUp;