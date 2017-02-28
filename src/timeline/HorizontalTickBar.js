import React, {Component, PureComponent} from 'react';
import {Range} from 'immutable';

export default function HorizontalTickBar(props){
	const {showLabels} = props;
	return (
		<div className="horizontal-tickbar">
			{Range(0, 100).map(time => {
				return (
					<div style={{left: time * 25}} key={time} className="tick">
						{showLabels && <span className="tick-label">{time * 10}</span>}
					</div>
				);
			})}
		</div>
	);
}
