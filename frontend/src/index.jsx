/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/weather`
    console.log("Getting greeting from "+url)
    const response = await fetch(url);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { greeting :"Could not get greeting from backend"};
};


const BackendGreeting = (props) => (
  <div>
	<p>The temperature is: {parseFloat(props.data.temperature).toFixed(1)}°C</p>
	<br />
	<p>The air pressure is: {parseInt(props.data.pressure)}hPa</p>
  </div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
	    data:"",
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    this.setState({data: response.results[response.results.length - 1]});
    document.body.style.backgroundColor='rgb('+this.state.data.red.toString()+','+this.state.data.green.toString()+','+this.state.data.blue.toString()+')';
    
    var rgb = [this.state.data.red, this.state.data.green, this.state.data.blue];

    for(let i=0; i<rgb.length; i++) {
	var c = rgb[i]
	c = c / 255.0;
	if(c <= 0.03928){
		c = c/12.92;
	} else {
	 	c = ((c+0.055)/1.055)**2.4;
	}
	rgb[i] = c;
    }

    const L = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    if(L > 0.179){
    	document.body.style.color='black';
    } else{
    	document.body.style.color='white';
    }
    
  }

  render() {

    return (
      <BackendGreeting data={this.state.data} />
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
