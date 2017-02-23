import React, { Component } from 'react';
import Timeline from './timeline/Timeline';
import './App.css';

function DemoControls(props){
	return (
		<div className="demo-controls">
			<div className="add-widget demo-control"
					onClick={props.addWidget}>
				Add Widget
			</div>
		</div>
	);
}

class App extends Component {
  constructor(){
  	super(...arguments);
    this.state = {
      widgets: [
				{name: 'Widget 1', keyframes:[]},
				{name: 'Widget 2', keyframes:[]},
				{name: 'Widget 3', keyframes:[]}
			]
    };
  }

	render() {
		return (
			<div className="App">
				<Timeline widgets={this.state.widgets} />
				<DemoControls addWidget={this.addWidget}  />
			</div>
		);
	}

	addWidget = () => {
  	this.setState({
  		widgets: this.state.widgets.concat({
  			name: 'Widget ' + (this.state.widgets.length + 1),
				keyframes: []
			})
		});
	}
}

export default App;
