/* App.js */
import CanvasJSReact from './canvasjs.react';
import server from 'utilities.js';
import 'scss/my-scss.scss';


var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Graph extends Component {	
	constructor(props){
		super(props);
		this.state = {
			name: "Ahmedabad",
			items: [{lable:"No Data Available",y:0}],
			options: {
				animationEnabled: true,
				exportEnabled: true,
				theme: "light2", //"light1", "dark1", "dark2"
				title:{
					text: "Simple Column Chart with Index Labels"
				},
				data: [{
					type: "column", //change type to bar, line, area, pie, etc
					//indexLabel: "{y}", //Shows y value on all Data Points
					indexLabelFontColor: "#5A5757",
					indexLabelPlacement: "outside",
					dataPoints: 
					 [
					 	{ x: 10, y: 71 },
						{ x: 20, y: 55 }
					// 	{ x: 30, y: 50 },
					// 	{ x: 40, y: 65 },
					// 	{ x: 50, y: 71 },
					// 	{ x: 60, y: 68 },
					// 	{ x: 70, y: 38 },
					// 	{ x: 80, y: 92, indexLabel: "Highest" },
					// 	{ x: 90, y: 54 },
					// 	{ x: 100, y: 60 },
					// 	{ x: 110, y: 21 },
					// 	{ x: 120, y: 49 },
					// 	{ x: 130, y: 36 }
					 ]
				}]
			}
		}
	}

	componentDidMount(){
		fetch(`http://${server.ip}:${server.port}/product/get-report-by-location/Ranip/1`)
		.then(res => res.json())
		.then(
		  (result) => {
			this.setState({
			  isLoaded: true,
			  //items: result,
			  options: {
				animationEnabled: true,
				exportEnabled: true,
				theme: "light2", //"light1", "dark1", "dark2"
				title:{
					text: "Simple Column Chart with Index Labels"
				},
				data: [{
					type: "column", //change type to bar, line, area, pie, etc
					//indexLabel: "{y}", //Shows y value on all Data Points
					indexLabelFontColor: "#5A5757",
					indexLabelPlacement: "outside",
					dataPoints: 
						result
					// 	{ x: 30, y: 50 },
					// 	{ x: 40, y: 65 },
					// 	{ x: 50, y: 71 },
					// 	{ x: 60, y: 68 },
					// 	{ x: 70, y: 38 },
					// 	{ x: 80, y: 92, indexLabel: "Highest" },
					// 	{ x: 90, y: 54 },
					// 	{ x: 100, y: 60 },
					// 	{ x: 110, y: 21 },
					// 	{ x: 120, y: 49 },
					// 	{ x: 130, y: 36 }
					// ]
				}]
			}
			});
		  },
		  // Note: it's important to handle errors here
		  // instead of a catch() block so that we don't swallow
		  // exceptions from actual bugs in components.
		  (error) => {
			this.setState({
			  isLoaded: true,
			  error
			});
		  }
		)
	}
	search=(e)=>{
		let searchStr = e.target.value;
		let dummy = this.state.options
		
		fetch(`http://${server.ip}:${server.port}/product/get-report-by-location/${searchStr}/1`)
		.then(res => res.json())
		.then(
		  (result) => {
			  dummy.data[0].dataPoints = result;
			this.setState({
			    isLoaded: true,
			//   dataPoints: result ,
			    name: searchStr,
				options : dummy
			});
		  },
		  // Note: it's important to handle errors here
		  // instead of a catch() block so that we don't swallow
		  // exceptions from actual bugs in components.
		  (error) => {
			this.setState({
			  isLoaded: true,
			  error
			});
		  }
		)
	}
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Simple Column Chart with Index Labels"
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: this.state.items,
				// dataPoints: [
				// 	{ x: 10, y: 71 },
				// 	{ x: 20, y: 55 },
				// 	{ x: 30, y: 50 },
				// 	{ x: 40, y: 65 },
				// 	{ x: 50, y: 71 },
				// 	{ x: 60, y: 68 },
				// 	{ x: 70, y: 38 },
				// 	{ x: 80, y: 92, indexLabel: "Highest" },
				// 	{ x: 90, y: 54 },
				// 	{ x: 100, y: 60 },
				// 	{ x: 110, y: 21 },
				// 	{ x: 120, y: 49 },
				// 	{ x: 130, y: 36 }
				// ]
			}]
		}
		
		return (
		<div>
			 <lable style={{fontSize:"17px"}}>search</lable>
			 <input className="input-box-style input" type="text" name="search" placeholder={this.state.name} onChange={this.search} /> 
			 <CanvasJSChart options = {this.state.options} 
			//	 onRef={ref => this.chart = ref} 
			/> 
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default Graph;                           