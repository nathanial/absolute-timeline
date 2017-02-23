import React, { Component } from 'react';
import './Timeline.css';

function WidgetName(props){
	return (
		<div className="widget-name">
			<span>
				{props.widget.name}
			</span>
		</div>
	);
}

function WidgetKeyframe(props){
	return (
		<div></div>
	);
}

function WidgetKeyframes(props){
	return (
		<div className="widget-keyframes">
			{props.widget.keyframes.map(keyframe => {
				return <WidgetKeyframe keyframe={keyframe} />
			})}
		</div>
	);
}

export default class Timeline extends Component {
	static propTypes = {
		widgets: React.PropTypes.array.isRequired
	};

	static defaultProps = {
		widgets: []
	};

	render(){
		return (
			<div className="timeline">
				<div className="timeline-left-bar">
					{this.props.widgets.map(widget => {
						return <WidgetName key={widget.name} widget={widget}/>
					})}
				</div>
				<div className="timeline-body">
					{this.props.widgets.map(widget => {
						return <WidgetKeyframes key={widget.name} widget={widget} />
					})}
				</div>
			</div>
		);
	}
}
