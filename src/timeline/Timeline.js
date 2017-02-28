import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './Timeline.css';
import _ from 'lodash'
import HorizontalTickbar from './HorizontalTickBar'
import TimelineBody from './TimelineBody';

function WidgetName(props){
	return (
		<div className="widget-name">
			<span>
				{props.widget.get('name')}
			</span>
		</div>
	);
}

function TimelineHeader({startTime}){
	return (
		<div className="timeline-header">
			<HorizontalTickbar startTime={startTime} showLabels={true}/>
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
		onAddKeyframe: React.PropTypes.func,
		onDeleteKeyframe: React.PropTypes.func,
		onKeyframeDragStart: React.PropTypes.func,
		onKeyframeDrag: React.PropTypes.func,
		onKeyframeDragComplete: React.PropTypes.func,
		totalTime: React.PropTypes.number.isRequired,
		onTotalTimeChanged: React.PropTypes.func,
		startTime: React.PropTypes.number,
		onStartTimeChanged: React.PropTypes.func
	};

	static defaultProps = {
		widgets: [],
		startTime: 0,
		onAddKeyframe: () => {},
		onDeleteKeyframe: () => {},
		onKeyframeDragStart: () => {},
		onKeyframeDrag: () => {},
		onKeyframeDragComplete: () => {},
		onTotalTimeChanged: () => {},
		onStartTimeChanged: () => {}
	};

	state = {
		showContextMenu: false,
		contextMenuWidget: null,
		contextMenuKeyframe: null
	};

	render(){
		const {totalTime} = this.props;
		return (
			<div className="timeline">
				<TimelineHeader startTime={this.props.startTime} widgets={this.props.widgets} />
				<div className="timeline-body-container">
					<div className="timeline-left-bar">
						{this.props.widgets.map(widget => {
							return <WidgetName key={widget.get('name')} widget={widget}/>
						})}
					</div>
					<TimelineBody ref="timelineBody" widgets={this.props.widgets}
								  startTime={this.props.startTime}
								  totalTime={this.props.totalTime}
								  onShowContextMenu={this.onShowContextMenu}
								  onKeyframeDragStart={this.props.onKeyframeDragStart}
								  onKeyframeDrag={this.props.onKeyframeDrag}
								  onKeyframeDragComplete={this.props.onKeyframeDragComplete}
								  onScroll={this.onBodyScroll}/>
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

		const widgetId = this.getWidgetId(event.target);
		if(!_.isUndefined(widgetId)){
			if(!this.state.showContextMenu){
				document.addEventListener('mousedown', this.onHideContextMenu, true);
			}
			const time = Math.round((event.clientX - 150) / 25);
			const widget =  this.props.widgets.find(w => w.get('id') === widgetId);
			let keyframe = null;
			if(widget){
				keyframe = widget.get('keyframes').find(k => (
					k.get('time') === Math.round(time)
				));
			}
			this.setState({
				showContextMenu: true,
				contextMenuWidget: widget,
				contextMenuKeyframe: keyframe,
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
			time: (this.state.contextMenuPosition.left - 150) / 25
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

	getWidgetId(target){
		let widgetId = target.dataset.widgetId;
		if(!_.isUndefined(widgetId)){
			return widgetId;
		}
		return target.parentNode.dataset.widgetId;
	}

	onBodyScroll = (handler, event) => {
		const bodyEl = ReactDOM.findDOMNode(this.refs.timelineBody);
		if(bodyEl.scrollLeft + bodyEl.clientWidth >= bodyEl.scrollWidth){
			this.props.onTotalTimeChanged(this.props.totalTime + 1);
		}
		this.props.onStartTimeChanged((bodyEl.scrollLeft) / 25)
	}
}
