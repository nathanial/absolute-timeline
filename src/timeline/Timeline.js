import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './Timeline.css';
import _ from 'lodash'

function WidgetName(props){
	return (
		<div className="widget-name">
			<span>
				{props.widget.get('name')}
			</span>
		</div>
	);
}

function WidgetKeyframe(props){
	const style = {
		left: props.keyframe.get('time') * 10
	};
	return (
		<div className="widget-keyframe" style={style}></div>
	);
}

function WidgetKeyframes(props){
	return (
		<div className="widget-keyframes" data-widget-id={props.widget.get('id')}>
			{props.widget.get('keyframes').map((keyframe, index) => {
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

class ContextMenu extends PureComponent {
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
		widgets: React.PropTypes.object.isRequired,
		onAddKeyframe: React.PropTypes.func
	};

	static defaultProps = {
		widgets: [],
		onAddKeyframe: () => {},
		onDeleteKeyframe: () => {}
	};

	state = {
		showContextMenu: false,
		contextMenuWidget: null,
		contextMenuKeyframe: null
	};

	render(){
		return (
			<div className="timeline-container">
				<TimelineHeader widgets={this.props.widgets} />
				<div className="timeline">
					<div className="timeline-left-bar">
						{this.props.widgets.map(widget => {
							return <WidgetName key={widget.get('name')} widget={widget}/>
						})}
					</div>
					<div className="timeline-body" onContextMenu={this.onShowContextMenu}>
						{this.props.widgets.map(widget => {
							return <WidgetKeyframes key={widget.get('name')} widget={widget} />
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
		if(!_.isUndefined(widgetId)){
			if(!this.state.showContextMenu){
				document.addEventListener('mousedown', this.onHideContextMenu, true);
			}
			this.setState({
				showContextMenu: true,
				contextMenuWidget: this.props.widgets.find(w => w.get('id') === widgetId),
				contextMenuPosition: { left: event.clientX, top: event.clientY}
			});
		}
	};

	onHideContextMenu = (event) => {
		const contextMenuNode = ReactDOM.findDOMNode(this.refs.contextMenu);
		if(!contextMenuNode.contains(event.target)) {
			this.hideContextMenu();
		}
	};

	onAddKeyframe = () => {
		this.props.onAddKeyframe({
			widget: this.state.contextMenuWidget,
			time: (this.state.contextMenuPosition.left - 155) / 10
		});
		this.hideContextMenu();
	};

	onDeleteKeyframe = () => {
		if(this.state.contextMenuKeyframe){
			this.props.onDeleteKeyframe({
				widget: this.state.contextMenuWidget,
				keyframe: this.state.contextMenuKeyframe
			});
		}
		this.hideContextMenu();
	};

	hideContextMenu = () => {
		this.setState({
			showContextMenu: false
		});
		document.removeEventListener('mousedown', this.onHideContextMenu, true);
	}
}
