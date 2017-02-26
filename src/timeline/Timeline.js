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
		<div className="widget-keyframes" data-widget-id={props.widget.id}>
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

function ContextMenuItem(props) {
	const label = props.label;
	const otherProps = _.omit(props, 'label');
	return (
		<div className="context-menu-item" {...otherProps}>
			{label}
		</div>
	)
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
				{this.props.children}
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
				{this.renderContextMenu()}
			</div>
		);
	}

	renderContextMenu(){
		if(!this.state.showContextMenu){
			return;
		}
		return (
			<ContextMenu ref="contextMenu" position={this.state.contextMenuPosition} >
				<ContextMenuItem label="Add Keyframe" onClick={this.onAddKeyframe} />
				<ContextMenuItem label="Delete Keyframe" onClick={this.onDeleteKeyframe}/>
			</ContextMenu>
		);
	}

	onShowContextMenu = (event) => {
		event.preventDefault();

		const widgetId = event.target.dataset.widgetId;
		console.log("Widget ID", widgetId);
		if(!_.isUndefined(widgetId)){
			if(!this.state.showContextMenu){
				document.addEventListener('mousedown', this.onHideContextMenu, true);
			}
			this.setState({
				showContextMenu: true,
				contextMenuWidget: _.find(this.props.widgets, w => w.id === widgetId),
				contextMenuPosition: { left: event.clientX, top: event.clientY}
			});
		}
	}

	onHideContextMenu = (event) => {
		const contextMenuNode = ReactDOM.findDOMNode(this.refs.contextMenu);
		if(!contextMenuNode.contains(event.target)) {
			this.hideContextMenu();
		}
	}

	onAddKeyframe = () => {
		console.log("Add Keyframe", this.state.contextMenuWidget);
		this.hideContextMenu();
	}

	onDeleteKeyframe = () => {
		console.log("Delete Keyframe");
		this.hideContextMenu();
	}

	hideContextMenu = () => {
		this.setState({
			showContextMenu: false
		});
		document.removeEventListener('mousedown', this.onHideContextMenu, true);
	}
}
