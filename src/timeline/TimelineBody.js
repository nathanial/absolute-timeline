import React from 'react';
import HorizontalTickbar from './HorizontalTickBar';
import WidgetKeyframe from './WidgetKeyframe';

export default function TimelineBody(props){
	const {
		widgets,
		onShowContextMenu,
		onKeyframeDragStart,
		onKeyframeDrag,
		onKeyframeDragComplete
	} = props;

	function onScroll(event){
		console.log("Scroll", event);

	}

	return (
		<div className="timeline-body" onContextMenu={onShowContextMenu} onScroll={onScroll}>
			{widgets.map(widget =>
				<div key={widget.get('id')}
					 className="widget-keyframes"
					 data-widget-id={widget.get('id')}>
					<HorizontalTickbar/>
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
	)
}
