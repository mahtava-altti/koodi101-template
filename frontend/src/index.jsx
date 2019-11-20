/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/greeting`
    console.log("Getting greeting from "+url)
    const response = await fetch(url);
    console.log(response);
    return response.json()
  } catch (error) {
    console.error(error);
  }
  return { greeting :"Could not get greeting from backend"};
};


const BackendGreeting = (props) => (
  <div><p>Backend says: {props.greeting}</p></div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      greeting: "",
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    this.setState({greeting: response.greeting});
  }

  render() {

    return (
      <BackendGreeting greeting={this.state.greeting} />
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
