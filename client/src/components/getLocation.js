import React, { Component } from "react";

class GetLocation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
    }
  }

  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
        
      }, ()=>{console.log(this.state.latitude)
        console.log(this.state.longitude)}),
      err => console.log(err)
    );
    
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.position} className='Filter'>Filter</button>
      </div>
    );
  }
}

export default GetLocation