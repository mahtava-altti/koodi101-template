/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css'

var Chart = require('./assets/chart.js/dist/Chart.min.js');

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
  return { data :"Could not get greeting from backend"};
};


const BackendGreeting = (props) => (
  <div>
	<p>The temperature is: {parseFloat(props.data.temperature).toFixed(1)}°C</p>
	<p>The air pressure is: {parseInt(props.data.pressure)}hPa</p>
	<br />
	<canvas id="myChart" width="400" height="400"></canvas>
  </div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
	    data:"",
	    history:[]
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    this.setState({data: response.results[response.results.length - 1]});
    for(let i=1;i<response.results.length && i<6;i++){
		var history = this.state.history;
		history.push(response.results[response.results.length-1]);
		this.setState(history:history);
	}
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
	Chart.defaults.global.defaultFontColor = 'black';
	var chartBorder = 'rgb(0,0,0)';
	var chartBackground = 'rgba(255,255,255,0.33)';
    } else{
    	document.body.style.color='white';
	Chart.defaults.global.defaultFontColor = 'white';
	chartBorder = 'rgb(255,255,255)';
	chartBackground = 'rgba(255,255,255,0.33)';
    }
    if(this.state.history.length > 0){
	    var temps = [];
	    var time = [];
	    for(let i=1;i<=this.state.history.length;i++){
			temps.push(this.state.history[this.state.history.length-i].temperature);
		time.push(this.state.history[this.state.history.length-i].createdAt);
		}
	    temps.push(this.state.data.temperature);
	    time.push(this.state.data.createdAt);

	}else{ temps = [this.state.data.temperature]; time = [this.state.data.createdAt]}

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
	    type: 'line',
	    data:{
		labels: time,
		datasets:[{
			label:"Temperature",
			data:temps,
			borderColor: chartBorder,
			backgroundColor: chartBackground
		}]
		},
	    options:{
		scales: {
			yAxes:[{
				ticks:{
					beginAtZero:false
					}
				}]
			}
		}
	});
    
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
