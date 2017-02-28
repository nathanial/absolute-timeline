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
						time: 1
					}
				]},
				{
					id: 'w2',
					name: 'Widget 2',
					keyframes: [
					{
						time: 2
					}
				]},
				{
					id: 'w3',
					name: 'Widget 3',
					keyframes:[
					{
						time: 3
					}
				]}
			])
		};
	}

	render() {
		return (
			<div className="App">
				<Timeline widgets={this.state.widgets}
						  onAddKeyframe={this.onAddKeyframe}
						  onDeleteKeyframe={this.onDeleteKeyframe}
						  onKeyframeDragStart={this.onKeyframeDragStart}
						  onKeyframeDrag={this.onKeyframeDrag}
						  onKeyframeDragComplete={this.onKeyframeDragComplete}/>
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
					time: Math.round(Math.random() * 25)
				}
			]
		});
		this.setState({
			widgets: this.state.widgets.concat([widget])
		});
	}

	onAddKeyframe = ({widget, time}) => {
		time = Math.round(time);
		const index = this.state.widgets.findKey(x => x === widget);
		const widgets = this.state.widgets.updateIn([index, 'keyframes'], x => x.concat([Immutable.fromJS({time})]))
		this.setState({
			widgets
		});
	}

	onDeleteKeyframe = ({widget, keyframe}) => {
		const {widgetIndex, keyframeIndex} = this.getWidgetAndKeyframeIndexes(widget, keyframe);
		const widgets = this.state.widgets.deleteIn([widgetIndex, 'keyframes', keyframeIndex])
		this.setState({
			widgets
		})
	}

	onKeyframeDragStart = ({widget, keyframe}) => {
	};

	onKeyframeDragComplete = ({widget, keyframe}) => {}

	onKeyframeDrag = ({widget, keyframe, time}) => {
		if(time < 0) {
			time = 0;
		}
		time = Math.round(time);
		const {widgetIndex, keyframeIndex} = this.getWidgetAndKeyframeIndexes(widget, keyframe);
		const widgets = this.state.widgets.updateIn([widgetIndex, 'keyframes', keyframeIndex, 'time'], k => time);
		this.setState({
			widgets
		});
	}

	getWidgetAndKeyframeIndexes(widget, keyframe) {
		return {
			widgetIndex: this.state.widgets.findKey(x => x === widget),
			keyframeIndex: widget.get('keyframes').findKey(x => x === keyframe)
		};
	}
}

export default App;
