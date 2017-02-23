import React, { Component } from 'react';
import './Timeline.css';

function WidgetName(props){
	return (
		<div className="timeline-widget-name">
			<span>
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
				<div className="timeline-left-bar">
					{this.props.widgets.map(widget => {
						return <WidgetName key={widget.name} widget={widget}/>
					})}
				</div>
			</div>
		);
	}
}
