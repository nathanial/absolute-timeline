import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Timeline.css';
import _ from 'lodash'

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
	const style = {
		left: props.keyframe.time * 10
	};
	return (
		<div className="widget-keyframe" style={style}></div>
	);
}

function WidgetKeyframes(props){
	return (
		<div className="widget-keyframes">
			{props.widget.keyframes.map((keyframe, index) => {
				return <WidgetKeyframe key={index} keyframe={keyframe} />
			})}
		</div>
	);
}

function TimelineHeader(props){
	return (
		<div className="timeline-header">
		</div>
	);
}

class ContextMenu extends Component {
	render(){
		const props = this.props;
		const style = {
			left: props.position.left,
			top: props.position.top
		}
		return (
			<div className="context-menu" style={style}>
			</div>
		);
	}
}

export default class Timeline extends Component {
	static propTypes = {
		widgets: React.PropTypes.array.isRequired
	};

	static defaultProps = {
		widgets: []
	};

	state = {
		showContextMenu: false
	}

	render(){
		return (
			<div className="timeline-container">
				<TimelineHeader widgets={this.props.widgets} />
				<div className="timeline">
					<div className="timeline-left-bar">
						{this.props.widgets.map(widget => {
							return <WidgetName key={widget.name} widget={widget}/>
						})}
					</div>
					<div className="timeline-body" onContextMenu={this.onShowContextMenu}>
						{this.props.widgets.map(widget => {
							return <WidgetKeyframes key={widget.name} widget={widget} />
						})}
					</div>
				</div>
				{this.state.showContextMenu && <ContextMenu ref="contextMenu" position={this.state.contextMenuPosition} />}
			</div>
		);
	}

	onShowContextMenu = (event) => {
		event.preventDefault();
		if(!this.state.showContextMenu){
			document.addEventListener('mousedown', this.onHideContextMenu, true);
		}
		this.setState({
			showContextMenu: true,
			contextMenuPosition: { left: event.clientX, top: event.clientY}
		});
	}

	onHideContextMenu = (event) => {
		const contextMenuNode = ReactDOM.findDOMNode(this.refs.contextMenu);
		if(contextMenuNode.contains(event.target)) {
			console.log("Clicked on context menu")
		} else {
			this.setState({
				showContextMenu: false
			});
			document.removeEventListener('mousedown', this.onHideContextMenu, true);
		}
	}
}
