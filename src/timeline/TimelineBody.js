import React, {PureComponent} from 'react';
import HorizontalTickbar from './HorizontalTickBar';
import WidgetKeyframe from './WidgetKeyframe';

export default class TimelineBody extends PureComponent {
	render(){
		const {
			widgets,
			onShowContextMenu,
			onKeyframeDragStart,
			onKeyframeDrag,
			onKeyframeDragComplete,
			totalTime,
			onScroll,
			startTime
		} = this.props;

		return (
			<div className="timeline-body" onContextMenu={onShowContextMenu} onScroll={onScroll}>
				{widgets.map(widget =>
					<div key={widget.get('id')}
						 style={{width: totalTime * 25}}
						 className="widget-keyframes"
						 data-widget-id={widget.get('id')}>
						<HorizontalTickbar totalTime={totalTime}/>
						{widget.get('keyframes').map((keyframe, index) =>
							<WidgetKeyframe key={index}
											widget={widget}
											keyframe={keyframe}
											onDragStart={onKeyframeDragStart}
											onDrag={onKeyframeDrag}
											onDragComplete={onKeyframeDragComplete} />
						)}
					</div>
				)}
			</div>
		);
	}

}
