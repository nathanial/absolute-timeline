import React, { Component } from 'react';
import './Timeline.css';

function TimelineWidget(props){
	return (
			<div className="timeline-widget">
				<span className="timeline-widget-name">
					{props.widget.name}
				</span>
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
				<div className="timeline-widgets">
					{this.props.widgets.map(widget => {
						return <TimelineWidget key={widget.name} widget={widget}/>
					})}
				</div>
			</div>
		);
	}
}
