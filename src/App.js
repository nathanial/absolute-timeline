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
				{
					id: 'w1',
					name: 'Widget 1',
					keyframes:[
					{
						time: 10
					}
				]},
				{
					id: 'w2',
					name: 'Widget 2',
					keyframes: [
					{
						time: 20
					}
				]},
				{
					id: 'w3',
					name: 'Widget 3',
					keyframes:[
					{
						time: 30
					}
				]}
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
				id: `w${this.state.widgets.length + 1}`,
				name: 'Widget ' + (this.state.widgets.length + 1),
				keyframes: [
					{
						time: Math.random() * 40
					}
				]
			})
		});
	}
}

export default App;
