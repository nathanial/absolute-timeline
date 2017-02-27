import React, { Component } from 'react';
import Timeline from './timeline/Timeline';
import './App.css';
import Immutable from 'immutable';

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
			widgets: Immutable.fromJS([
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
			])
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
		const widget = Immutable.fromJS({
			id: `w${this.state.widgets.size + 1}`,
			name: 'Widget ' + (this.state.widgets.size + 1),
			keyframes: [
				{
					time: Math.random() * 40
				}
			]
		});
		this.setState({
			widgets: this.state.widgets.concat([widget])
		});
	}
}

export default App;
