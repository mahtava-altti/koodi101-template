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
