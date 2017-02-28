import React, {Component} from 'react';

export default class WidgetKeyframe extends Component {
	static propTypes = {
		widget: React.PropTypes.object.isRequired,
		keyframe: React.PropTypes.object.isRequired,
		onDragStart: React.PropTypes.func,
		onDrag: React.PropTypes.func,
		onDragComplete: React.PropTypes.func
	};

	static defaultProps = {
		onDragStart: () => {},
		onDrag: () => {},
		onDragComplete: () => {}
	};

	render(){
		const style = {
			left: this.props.keyframe.get('time') * 25
		};
		return (
			<div className="widget-keyframe" style={style}
				onMouseDown={this.onStartDrag}>
			</div>
		);
	}

	onStartDrag = (event) => {
		const {widget, keyframe} = this.props;
		this.props.onDragStart({
			widget,
			keyframe,
			time: (event.clientX - 150) / 25,
		});
		document.addEventListener('mousemove', this.onMouseMove, true);
		document.addEventListener('mouseup', this.onMouseUp, true);
	}

	onMouseMove = (event) => {
		const {widget, keyframe} = this.props;
		this.props.onDrag({
			widget,
			keyframe,
			time: (event.clientX - 150) / 25,
		});
	};

	onMouseUp = (event) => {
		document.removeEventListener('mousemove', this.onMouseMove, true);
		document.removeEventListener('mouseup', this.onMouseUp, true);
		const {widget, keyframe} = this.props;
		this.props.onDragComplete({
			widget,
			keyframe
		});
	};

}